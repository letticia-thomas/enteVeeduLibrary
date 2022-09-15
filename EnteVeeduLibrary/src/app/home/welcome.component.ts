import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { delay } from 'rxjs';
import { IAuth } from '../shared/auth';
import { AuthService } from '../shared/auth.service';

@Component({
  templateUrl: './welcome.component.html'
})
export class WelcomeComponent {
  public pageTitle = 'Welcome';
  @Output() loginSuccessfull: EventEmitter<string> =
    new EventEmitter<string>();

  user = {} as  IAuth ;
  isAuth : boolean =false;
  constructor(private auth:AuthService,private router: Router){}
  
  onClick(): void {
    this.loginSuccessfull.emit(`The rating ${this.user.username}was clicked!`);
  }

  login(formValue:any):void{
    console.log(formValue);
    this.user = formValue;
    this.isAuth=this.auth.authCheck(this.user); 
    if(this.isAuth)
        this.router.navigate(['/bookshelf']);
    else{
      this.router.navigate(['/welcome']);
      console.error("User not authorised!");
    }
  }
  addNewUser():void{
    this.router.navigate(['/newuser']);
  }
}