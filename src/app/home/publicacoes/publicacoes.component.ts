import { Component, OnInit } from '@angular/core';
import { Bd } from "../../bd.service";
import * as firebase from "firebase";

@Component({
  selector: 'app-publicacoes',
  templateUrl: './publicacoes.component.html',
  styleUrls: ['./publicacoes.component.css']
})
export class PublicacoesComponent implements OnInit {

  constructor(private bd: Bd) { }
  public publicacoes: Array<any>;
  private emailUsuario: string;
  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      this.emailUsuario = user.email;
      this.atualizarTimeLine();
    })
  }

  public atualizarTimeLine(): void {
    console.log("EXECUTANDO");
    this.bd.consultaPublicacoes(this.emailUsuario).then((resolve: any) => {
      this.publicacoes = resolve;
      console.log("LISTA: ", resolve);
    }) 
    
  }
}
