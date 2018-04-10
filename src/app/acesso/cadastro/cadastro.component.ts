import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { Autenticacao } from "../../autenticacao.service";
import { Usuario } from "../usuario.model"
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  animations: [
    trigger("cadastro-fail", [
      state("fail", style({ border: "2px solid red" })),
      transition("void => fail", [
        animate("1.5s 0s ease-in-out", keyframes([
          style({ offset: 0, border: "1px solid red" }),
          style({ offset: 0.15, opacity: 1, transform: "translateX(0)" }),
          style({ offset: 0.86, opacity: 1, transform: "translateX(0)" }),
          style({ offset: 0.88, opacity: 1, transform: "translateY(-10px)" }),
          style({ offset: 0.90, opacity: 1, transform: "translateY(10px)" }),
          style({ offset: 0.92, opacity: 1, transform: "translateY(-10px)" }),
          style({ offset: 0.94, opacity: 1, transform: "translateY(10px)" }),
          style({ offset: 0.96, opacity: 1, transform: "translateY(-10px)" }),
          style({ offset: 0.98, opacity: 1, transform: "translateY(10px)" }),
          style({ offset: 1, opacity: 1, transform: "translateY(0)" }),
        ]))
      ])

    ])
  ]
})
export class CadastroComponent implements OnInit {

  constructor(private autenticacao: Autenticacao) { }

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter();
  @Output() public falharPainel: EventEmitter<string> = new EventEmitter();

  public estadoCadastro: string = "void";
  public failCadastro: boolean = false;
  public formularioCadastro: FormGroup = new FormGroup({
    "email": new FormControl(null),
    "nome": new FormControl(null),
    "usuario": new FormControl(null),
    "senha": new FormControl(null)
  });

  public exibirPainelLogin(): void {
    console.log("OI");
    this.exibirPainel.emit("login");
  }

  public botaoDisabled(): boolean {

    return this.formularioCadastro.get("email").pristine || this.formularioCadastro.get("nome").pristine || this.formularioCadastro.get("usuario").pristine || this.formularioCadastro.get("senha").pristine || (this.formularioCadastro.get("senha").dirty && this.formularioCadastro.get("senha").value.length < 6);

  }
  public cadastrarUsuario(): void {
    let usuario: Usuario = new Usuario(this.formularioCadastro.get("email").value, this.formularioCadastro.value.nome, this.formularioCadastro.value.usuario, this.formularioCadastro.value.senha);
    this.autenticacao.cadastroUsuario(usuario).then(() => this.exibirPainelLogin()).then(() => {
      this.failCadastro = false;
      this.estadoCadastro = "void";
    }).catch(() => {
      this.failCadastro = true;
      this.estadoCadastro = "fail";
    });


  }
  ngOnInit() {

  }

}
