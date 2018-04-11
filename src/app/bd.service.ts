import * as firebase from "firebase";
import { Injectable } from "@angular/core";
import { Progresso } from "./progresso.service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class Bd {
  constructor(private progresso: Progresso) { }


  public publicar(publicacao: any): void {
    console.log(publicacao);
    firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`).push({ titulo: publicacao.titulo }).then((resposta: any) => {
      var nomeImagem = resposta.key;
      firebase.storage().ref().child(`imagens/${nomeImagem}`).put(publicacao.imagem).on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot: any) => {
        this.progresso.status = "Andamento";
        this.progresso.porcentagem = snapshot.bytesTransferred / snapshot.totalBytes;
      },
        (error: any) => {
          this.progresso.status = "Erro";
        },
        () => {
          this.progresso.status = "Concluido";

        });
    })
  }



  public consultaPublicacoes(email: string): Promise<any> {


    return new Promise((resolve, reject) => {
      firebase.database().ref(`publicacoes/${btoa(email)}`).orderByKey().once('value').then((snapshot: any) => {
        let publicacoes: Array<any> = [];

        snapshot.forEach((childSnapshot: any) => {
          let publicacao = childSnapshot.val();
          publicacao.key = childSnapshot.key;
          publicacoes.push(publicacao);
        })

        return publicacoes.reverse();
        // resolve(publicacoes.reverse());
      }).then((publicacoes: any) => {
        publicacoes.forEach((item) => {

          firebase.storage().ref(`imagens/${item.key}`).getDownloadURL().then((url: string) => {
            item.url_imagem = url;

            firebase.database().ref(`usuario_detalhe/${btoa(email)}`).once('value').then((snapshot: any) => {
              item.nomeUsuario = snapshot.val().nome;
            })

            
          })

        })

        resolve(publicacoes);
      })

    })
  }








}

// let publicacao = childSnapshot.val();
//           firebase.storage().ref(`imagens/${childSnapshot.key}`).getDownloadURL().then((url: string) => {
//             publicacao.url_imagem = url;

//             firebase.database().ref(`usuario_detalhe/${btoa(email)}`).once('value').then((snapshot: any) => {
//               publicacao.nomeUsuario = snapshot.val().nome;
//             })

//             publicacoes.push(publicacao);
//           })