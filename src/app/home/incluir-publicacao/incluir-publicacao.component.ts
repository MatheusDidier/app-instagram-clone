import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { Bd } from "../../bd.service";
import * as firebase from "firebase";
import { Progresso } from "../../progresso.service";
import { Subject } from "rxjs/Subject";

import { Observable } from "rxjs/Observable";
import "rxjs/Rx";
@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css']
})
export class IncluirPublicacaoComponent implements OnInit {

  constructor(private bd: Bd, private progresso: Progresso) { }


  public progressoPublicacao: string = "Pendente";
  public porcentagemUpload: number = 0;

  @Output() public atualizarTimeLine: EventEmitter<any> = new EventEmitter<any>();

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

    this.progressoPublicacao = "Andamento";

    let continua = new Subject();
    continua.next(true);
    let acompanhamentoUpload = Observable.interval(1500);
    acompanhamentoUpload.
      takeUntil(continua).subscribe(() => {
        this.porcentagemUpload = Math.round(this.progresso.porcentagem * 100);
        if (this.progresso.status == "Concluido" || this.progresso.status == "Erro") {
          this.progressoPublicacao = "Concluido";
          this.atualizarTimeLine.emit();
          continua.next(false);
        }
      });
  }

  public preparaImagemUpload(event: Event): void {

    this.imagem = (<HTMLInputElement>event.target).files;
  }

}
