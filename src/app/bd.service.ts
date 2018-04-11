import * as firebase from "firebase";
import { Injectable } from "@angular/core";
import { Progresso } from "./progresso.service";

@Injectable()
export class Bd {
  constructor(private progresso: Progresso) { }

  public publicar(publicacao: any): void {
    console.log(publicacao);
    firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`).push({ titulo: publicacao.titulo}).then((resposta: any) => {
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

}
