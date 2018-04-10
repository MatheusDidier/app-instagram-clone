import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';
import { Imagem } from './imagem.model';
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  animations: [
    trigger
      (
      'banner', [
        state("escondido", style({ opacity: 0 })),
        state("visivel", style({ opacity: 1 })),
        transition("escondido <=> visivel", animate("1s ease-in"))
      ]
      )
  ]
})
export class BannerComponent implements OnInit {

  public estado: string = "escondido";
  public imagens: Imagem[] = [
    { estado: "visivel", url: "/assets/banner-acesso/img_1.png" },
    { estado: "escondido", url: "/assets/banner-acesso/img_2.png" },
    { estado: "escondido", url: "/assets/banner-acesso/img_3.png" },
    { estado: "escondido", url: "/assets/banner-acesso/img_4.png" },
    { estado: "escondido", url: "/assets/banner-acesso/img_5.png" }
  ];
  constructor() { }


  ngOnInit() {
    var vasculhador: number = 1;
    this.logicaRotacao(vasculhador);
  }
  public logicaRotacao(vasculhador: number): void {

    for (let i: number = 0; i < this.imagens.length; i++) {
      if(this.imagens[i].estado == "visivel"){
        this.imagens[i].estado = "escondido";
        let proximo = i == (this.imagens.length - 1) ? 0 : (i + 1);
        this.imagens[proximo].estado = "visivel";
        break;
      }
    }
    setTimeout(() => this.logicaRotacao(vasculhador), 2000);

  }

}
