import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, throwError, tap } from "rxjs";
import { IBook } from "./book";

@Injectable({
    providedIn : 'root'
})
export class BookService
{

  private bookUrl : string ='api/books/books.json';

  constructor (private http : HttpClient){}

  getBooks(): Observable<IBook[]>
  {
    return this.http.get<IBook[]>(this.bookUrl)
      .pipe(
        tap(data => console.log('All: ', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getBook(id: number): Observable<IBook | undefined> {
    return this.getBooks()
      .pipe(
        map((books: IBook[]) => books.find(p => p.bookId === id))
      );
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