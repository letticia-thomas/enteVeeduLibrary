import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, throwError, tap, of, switchMap } from "rxjs";
import { IAuth } from "../shared/auth";
import { AuthService } from "../shared/auth.service";
import { IBook } from "./book";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private bookUrl: string = 'api/books/books.json';
  private bookUrl2: string = 'http://localhost:3000/book';
  private fireUrl: string = "https://myhomelibrary-699df-default-rtdb.europe-west1.firebasedatabase.app/book/.json"
  private user: IAuth | undefined;

  constructor(private http: HttpClient, private auth: AuthService) { }

  getBooks(): Observable<IBook[]> {
    /* const bookString = localStorage.getItem('books');
     const booksJson : IBook[] = JSON.parse(bookString || '[]');
     if(booksJson.length)
        return of(booksJson);
     return this.http.get<IBook[]>(this.bookUrl2)
       .pipe(
         tap(data => localStorage.setItem('books', JSON.stringify(data))),
         catchError(this.handleError)
       );*/
    return this.http.get<IBook[]>(this.fireUrl)
      .pipe(map((data: IBook[]) => {
        let arr = [] as IBook[];
        for (var m in data) {
          if(Number(m)!==0)
              arr.push(data[m]);
      //   localStorage.setItem('books', JSON.stringify(data[m].id));

        }
        data = arr;
        localStorage.setItem('books', JSON.stringify(data));
        return data;
      }),
        catchError(this.handleError)
      );
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

  saveBook(newbook: IBook): Observable<IBook> {

    console.log(newbook);

    /*
    booksJson.push(newbook);
    localStorage.setItem('books', JSON.stringify(booksJson));
    return of(newbook)
    //return this.http.post<IBook>('api/books/books.json', newbook, httpOptions).pipe(catchError(this.handleError));*/

    const bookString = localStorage.getItem('books');
    if (!bookString)
      return this.getBooks().pipe(switchMap(() => this.saveBook(newbook)));
    const booksJson: IBook[] = JSON.parse(bookString || '[]');
    newbook.id = booksJson[booksJson.length - 1]?.id || 1;
    newbook.id++;
    this.user = this.auth.getCurrentUser();
    newbook.reader = this.user?.firstName + " " + this.user?.lastName;
    let saveUrl = "https://myhomelibrary-699df-default-rtdb.europe-west1.firebasedatabase.app/book/"+newbook.id+"/.json";
    return this.http.put<IBook>(saveUrl, newbook).pipe(catchError(this.handleError));

  }

  updateBook(updateBook: IBook) {
    const putUrl = "https://myhomelibrary-699df-default-rtdb.europe-west1.firebasedatabase.app/book/" + updateBook.id +"/.json";
    const currentUser = this.auth.getCurrentUser();
    const readerName = currentUser?.firstName + " " + currentUser?.lastName;
    updateBook.reader = readerName;
    console.log("URL: " + putUrl);
    this.http.put(putUrl, updateBook).subscribe();
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

  deleteBook(id: Number) {
    const deleteUrl = "https://myhomelibrary-699df-default-rtdb.europe-west1.firebasedatabase.app/book/" + id+"/.json";
    console.log("Delete URL: " + deleteUrl);
    this.http.delete(deleteUrl).subscribe();

  }

  updateReader(id: Number | undefined, book: IBook | undefined): void {
    const putUrl = "https://myhomelibrary-699df-default-rtdb.europe-west1.firebasedatabase.app/book/" + id +"/.json";
    const currentUser = this.auth.getCurrentUser();
    const readerName = currentUser?.firstName + " " + currentUser?.lastName;
    if (book != undefined) {
      console.log(currentUser?.firstName + "; " + currentUser?.bookCount);
      book.currentReader = readerName;
    }
    this.http.put(putUrl, book).subscribe({
      next: (data) => { console.log(JSON.stringify(data)) }
    });
  }

  removeReader(id: Number | undefined, book: IBook | undefined): boolean {
    const putUrl ="https://myhomelibrary-699df-default-rtdb.europe-west1.firebasedatabase.app/book/" + id +"/.json";
    let isUpdated: boolean = false;
    const currentUser = this.auth.getCurrentUser();
    const readerName = currentUser?.firstName + " " + currentUser?.lastName;
    if (book != undefined) {
      if (currentUser?.bookCount) {

        currentUser.bookCount--;

      }
      console.log(currentUser?.firstName + "; " + currentUser?.bookCount);
      book.currentReader = undefined;
    }
    // this.auth.updateUser(currentUser);
    this.http.put(putUrl, book).subscribe({
      next: () => { isUpdated = true }
    });
    return isUpdated;
  }

}