import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { Bd } from "../../bd.service";
import * as firebase from "firebase";
import {Progresso} from "../../progresso.service";
import {Subject} from "rxjs/Subject";

import {Observable} from "rxjs/Observable";
import "rxjs/Rx";
@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css']
})
export class IncluirPublicacaoComponent implements OnInit {

  constructor(private bd: Bd, private progresso:Progresso) { }

  public formularioPublicacao: FormGroup = new FormGroup({
    "titulo": new FormControl(null)
  })

  private imagem: any;

  public emailUsuarioPublicacao: string;

  ngOnInit() {


    firebase.auth().onAuthStateChanged((user) => {
      this.emailUsuarioPublicacao = user != null ? user.email : "";
    })

  }

  public publicar(): void {
    this.bd.publicar({
      email: this.emailUsuarioPublicacao,
      titulo: this.formularioPublicacao.value.titulo,
      imagem: this.imagem[0]
    });

    let continua = new Subject();
    continua.next(true);
    let acompanhamentoUpload = Observable.interval(1500);
    acompanhamentoUpload.
    takeUntil(continua).subscribe(() => {
      console.log(this.progresso.status);
      console.log(this.progresso.estado);
      if(this.progresso.status == "Concluido" || this.progresso.status == "Erro"){
        continua.next(false);
      }
    });
  }

  public preparaImagemUpload(event: Event): void {

    this.imagem = (<HTMLInputElement>event.target).files;
  }

}
