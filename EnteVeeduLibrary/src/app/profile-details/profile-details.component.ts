import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAuth } from '../shared/auth';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'pm-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {
  
  currentUser : IAuth | undefined;
  name : string |undefined;
  email : string |undefined;


  constructor(private auth:AuthService,
              private router: Router ) { 
                this.currentUser = this.auth.getCurrentUser();
                this.name = this.currentUser?.firstName + "  "+ this.currentUser?.lastName;
              }

  ngOnInit(): void {

    
  }

  onBack()
  {
    this.router.navigate(['/bookshelf']);
  }

  logout(){
    const currentUser = this.auth.getCurrentUser();
    this.auth.updateUser(currentUser);
    sessionStorage.removeItem('user');
    this.router.navigate(['/welcome']);
  }

}
