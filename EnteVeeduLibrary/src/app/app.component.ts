import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./shared/auth.service";


@Component({
  selector: 'pm-root',
  template: `
    <nav class='navbar'>
        <a class='navbar-brand'>{{pageTitle}}</a>
        <ul class='nav nav-pills'>
        </ul>
    </nav>
    
   <div class='container'>
      <router-outlet></router-outlet>
    </div>
    `,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title(title: any) {
    throw new Error('Method not implemented.');
  }
  public isAuthorized: boolean = true;
  constructor(private auth: AuthService, private router:Router){
    this.isAuthorized = this.auth.isAuth;
    console.log("isAuth at root "+this.isAuthorized);
  }
  
  ngOnInit(): void {
    

  }
  pageTitle = 'Welcome';
  userName :String ='';
}