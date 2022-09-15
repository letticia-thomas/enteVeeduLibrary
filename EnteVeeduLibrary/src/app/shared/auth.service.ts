import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { delay, find, map, Observable, of, Subscription, switchMap, tap } from 'rxjs';
import { IAuth } from './auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuth : boolean = false;
  sub : Subscription | undefined;
  user :IAuth | undefined ;

  constructor(private http : HttpClient) { }

  authCheck(auth : IAuth):boolean
  {
    this.isAuth = false;
    console.log("in authcheck"+auth.username);
   

    this.getAuth(auth).pipe(
      map((users: IAuth[]) => users.find(p => p.username === auth.username))
         ).subscribe({next: user =>{ console.log("subscribed user" + user?.username);
                                    this.user = user ;
                                  }
                                    
    });
    if(this.user?.username === auth.username)
      {
        console.log("auth user!");
        this.isAuth = true;
      }
      else
      {
        console.log("non auth user!");
        this.isAuth = false;
     }
    return this.isAuth;
  }
  getAuth(auth:IAuth):Observable<IAuth[]>
  {
    const url = 'http://localhost:3000/users';
    return this.http.get<IAuth[]>(url)
      .pipe(
        tap((data)=>{console.log("data in db "+JSON.stringify(data))}
        ));
      
  }

  authCheckResult():boolean
  {
    return this.isAuth;
  }

  addUser(newUser: IAuth)
  {
    const url = 'http://localhost:3000/users';
    this.http.post(url,newUser).subscribe();
  }
  getCurrentUser():IAuth |undefined
  {
     return this.user;
  }
}
