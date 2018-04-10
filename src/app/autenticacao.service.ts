import { Usuario } from "./acesso/usuario.model";
import * as firebase from "firebase";
import { Injectable, Output } from "@angular/core";
import { Router } from "@angular/router";



@Injectable()
export class Autenticacao {

  public token_id: string;

  constructor(private router: Router) { }



  public cadastroUsuario(usuario: Usuario): Promise<any> {
    console.log("CHEGAMOS ATÈ O SERVIÇO");
    return firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha).then((resposta: any) => {
      delete usuario.senha;
      firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`).set(usuario);
    })
  }

  public autenticar(email: string, senha: string): Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email, senha).then((response: any) => {
      firebase.auth().currentUser.getIdToken().then((token: string) => {
        localStorage.setItem("idToken", token);
        this.token_id = token;
        this.router.navigate(["/home"]);
        console.log(this.token_id);
      })
    })
  }

  public isLogado(): boolean {
    if(!!this.token_id || !!localStorage.getItem("idToken")){
      this.router.navigate(["/home"]);
    }
    return !(!!this.token_id || !!localStorage.getItem("idToken"));
  }

  public autenticado(): boolean {
    if (!this.token_id && localStorage.getItem("idToken")) {
      this.token_id = localStorage.getItem("idToken");
    }


    if (!this.token_id) {
      this.router.navigate(["/"]);
    }
    return !!this.token_id;
  }

  public logout(): void {
    firebase.auth().signOut().then(() => {
      localStorage.removeItem("idToken");
      this.token_id = undefined;
    }).then(() => {
      this.router.navigate(["/"]);
    });


  }


}
