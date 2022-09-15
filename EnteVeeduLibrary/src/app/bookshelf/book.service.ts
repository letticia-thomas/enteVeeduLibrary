import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, throwError, tap, of, switchMap } from "rxjs";
import { IAuth } from "../shared/auth";
import { AuthService } from "../shared/auth.service";
import { IBook } from "./book";

@Injectable({
    providedIn : 'root'
})
export class BookService
{

  private bookUrl : string ='api/books/books.json';
  private bookUrl2 : string ='http://localhost:3000/book';
  private user: IAuth |undefined;

  constructor (private http : HttpClient, private auth:AuthService){}

  getBooks(): Observable<IBook[]>
  {
   /* const bookString = localStorage.getItem('books');
    const booksJson : IBook[] = JSON.parse(bookString || '[]');
    if(booksJson.length)
       return of(booksJson);
    return this.http.get<IBook[]>(this.bookUrl2)
      .pipe(
        tap(data => localStorage.setItem('books', JSON.stringify(data))),
        catchError(this.handleError)
      );*/
      return this.http.get<IBook[]>(this.bookUrl2)
      .pipe(
        tap(data => localStorage.setItem('books', JSON.stringify(data))),
        catchError(this.handleError));
  }

  getBook(id: number): Observable<IBook | undefined> {
   /* const bookString = localStorage.getItem('books');
    if(!bookString)
        return this.getBooks().pipe(switchMap(()=>this.getBook(id)));
    const bookJson = JSON.parse(bookString || '[]');
    return of(bookJson.find((p:IBook)=>p.id == id));*/
    return this.getBooks()
      .pipe(
        map((books: IBook[]) => books.find(p => p.id === id))
      );
  }

  saveBook(newbook: IBook):Observable <IBook>{
   
    console.log(newbook);

    /*
    booksJson.push(newbook);
    localStorage.setItem('books', JSON.stringify(booksJson));
    return of(newbook)
    //return this.http.post<IBook>('api/books/books.json', newbook, httpOptions).pipe(catchError(this.handleError));*/
    
    const bookString = localStorage.getItem('books');
    if(!bookString)
      return this.getBooks().pipe(switchMap(()=>this.saveBook(newbook)));
    const booksJson : IBook[] = JSON.parse(bookString || '[]');
    newbook.id = booksJson[booksJson.length-1]?.id||1;
    newbook.id++;
    this.user = this.auth.getCurrentUser();
    newbook.reader = this.user?.firstName+" "+this.user?.lastName;
    return this.http.post<IBook>(this.bookUrl2, newbook).pipe(catchError(this.handleError));

  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }

   
}