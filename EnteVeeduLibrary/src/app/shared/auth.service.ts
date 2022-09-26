import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { delay, find, map, Observable, of, Subscription, switchMap, tap } from 'rxjs';
import { IAuth } from './auth';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuth: boolean = false;
  sub: Subscription | undefined;
  user: IAuth | undefined;
  allMembers  :IAuth[] |undefined;

  constructor(private http: HttpClient) {  }

  authCheck(auth: IAuth): Observable<boolean> {
    this.isAuth = false;
    console.log("in authcheck" + auth.username);


    return this.getAuth(auth).pipe(
      map((users: IAuth[]) => users.find(p => (p.username === auth.username) && (p.password === auth.password))),
      map((user) => {
        this.user = user;
        if (user) {
          sessionStorage.setItem('user', JSON.stringify(this.user))
        }
        else {
          sessionStorage.removeItem('user');
        }
        this.isAuth = !!user;
        return this.isAuth;
      })
    );
  }
  getAuth(auth:IAuth): Observable<IAuth[]> {
    const url = 'https://myhomelibrary-699df-default-rtdb.europe-west1.firebasedatabase.app/user/.json';
    return this.http.get<IAuth[]>(url)
      .pipe(
        map((data: IAuth[]) => {
          let arr = [] as IAuth[];
          for (var m in data) {
           arr.push(data[m]);
        //   localStorage.setItem('books', JSON.stringify(data[m].id));
  
          }
          data = arr;
          localStorage.setItem('users', JSON.stringify(data));
          return data;
        }
        ));

  }

  authCheckResult(): boolean {
    return this.isAuth;
  }

  addUser(newUser: IAuth) {
    this.getAuth(newUser);
    const authString = localStorage.getItem('users');
    const authJson: IAuth[] = JSON.parse(authString || '[]');
    newUser.id = authJson[authJson.length - 1]?.id || 1;
    newUser.id++;
    const url = "https://myhomelibrary-699df-default-rtdb.europe-west1.firebasedatabase.app/user/"+newUser.id+"/.json";
    this.http.put(url, newUser).subscribe();
  }

  getCurrentUser(): IAuth | undefined {
    if (this.user) {
      return this.user;
    }
    const userString = sessionStorage.getItem('user');
    if (userString) {
      const userJson = JSON.parse(userString);
      this.user = userJson;
    }
    return this.user;
  }
getAllMembers():IAuth[]|undefined
{
  return this.allMembers;
}

updateUser(user:IAuth|undefined)
{
  const putUrl = 'http://localhost:3000/users'+"/"+user?.id;
  this.http.put(putUrl,user).subscribe();

}

}
