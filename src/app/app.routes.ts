import { Routes } from "@angular/router";
import { AcessoComponent } from "./acesso/acesso.component";
import { HomeComponent } from "./home/home.component";
import { AutenticacaoGuard } from "./autenticacao-guard.service"
import {estaLogado} from "./esta-logado.service";

export const ROUTES: Routes = [
  { path: "", component: AcessoComponent, canActivate: [estaLogado] },
  { path: "home", component: HomeComponent, canActivate: [AutenticacaoGuard] }
]
