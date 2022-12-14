import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAuth } from '../shared/auth';
import { AuthService } from '../shared/auth.service';


@Component({
  selector: 'pm-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  newUser = {} as IAuth;

  constructor(private auth: AuthService, private router: Router
  ) { }

  ngOnInit(): void {

  }
  addUser(formValue: any): void {

    if (formValue.username && formValue.email && formValue.password) {
      
        if (formValue.password === formValue.confirmPassword)
        {
          this.newUser = formValue;
          this.auth.addUser(this.newUser);
          this.backToWelcome();
        }
  
        else {
           alert("Confirmed password is incorrect!")
            }
          }
        else {
            alert("please fill necessary information!")
        }
  
  }
  backToWelcome() {
    this.router.navigate(['/welcome']);
  }

}
