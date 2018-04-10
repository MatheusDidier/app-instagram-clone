import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { Autenticacao } from "../../autenticacao.service";
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger("login-fail", [
      state("fail", style({ border: "2px solid red" })),
      transition("void => fail", [
        animate("1.5s 0s ease-in-out", keyframes([
          style({offset: 0, border: "1px solid red"}),
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
export class LoginComponent implements OnInit {

  constructor(private autenticacao: Autenticacao) { }
  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter();

  public estadoLogin: string = "void";
  public loginFail: boolean = false;
  public formularioLogin: FormGroup = new FormGroup({
    "email": new FormControl(null),
    "senha": new FormControl(null)
  }
  )


  public logar(): void {
    this.autenticacao.autenticar(this.formularioLogin.value.email, this.formularioLogin.get("senha").value).catch(() => {
      this.loginFail = true;
      console.log("FAIL");
      this.estadoLogin = "fail";

    });
  }

  public exibirPainelCadastro(): void {
    this.exibirPainel.emit("cadastro");
  }
  ngOnInit() {

  }

}
