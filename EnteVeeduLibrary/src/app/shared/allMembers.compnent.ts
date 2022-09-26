import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { IAuth } from "./auth";
import { AuthService } from "./auth.service";



@Component({
  selector: 'all-members',
  template: `
    <nav class='navbar'>
        <a class='navbar-brand'>All Members</a>
        <ul  class='nav nav-pills'>
        </ul>       
    </nav>
    <div>
    <tbody>
          <tr *ngFor="let member of allMembers">
            <td>{{ member.firstName | uppercase | convertToSpaces:'-' }}: Currently holding {{member.bookCount}} books.</td>
          </tr>
        </tbody>
    </div>
    
    `
})
export class allMembersComponent implements OnInit {

  allMembers : IAuth[]|undefined
  public isAuthorized: boolean = true;
  constructor(private auth: AuthService, private router:Router){
            this.allMembers=this.auth.getAllMembers();
  }
  
  ngOnInit(): void {
     

  }
}