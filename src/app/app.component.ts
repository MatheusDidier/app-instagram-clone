import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  ngOnInit(): void {
    var config = {
      apiKey: "AIzaSyCjRXdQju260QUXzF1oXEcTbq9V2cQ3m2w",
      authDomain: "jta-instagram-clone-b609b.firebaseapp.com",
      databaseURL: "https://jta-instagram-clone-b609b.firebaseio.com",
      projectId: "jta-instagram-clone-b609b",
      storageBucket: "jta-instagram-clone-b609b.appspot.com",
      messagingSenderId: "649873522034"
    };
    firebase.initializeApp(config);
  }

}
