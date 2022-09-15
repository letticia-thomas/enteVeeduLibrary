import { CompileIdentifierMetadata } from "@angular/compiler";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "../shared/auth.service";
import { IBook } from "./book";
import { BookService } from "./book.service";

@Component({
    selector : 'book-shelf',
    templateUrl: './bookshelf.component.html',
    styleUrls: ['./bookshelf.component.css']
})

export class BookShelfComponent implements OnInit{
    pageTitle: String = 'Book Shelf';
    userName: string ='';
    errorMessage = '';
    books : IBook[] =[];
    imageWidth = 50;
    imageMargin = 2;
    showImage = false;
    public isAuth :boolean = false;
    filteredBooks: IBook[] = [];
    sub : Subscription | undefined;
    constructor(private BookService: BookService, private auth:AuthService,private router: Router)
    {

    }

    private _listFilter = '';
    get listFilter(): string {
      return this._listFilter;
    }
    set listFilter(value: string) {
      this._listFilter = value;
      this.filteredBooks = this.performFilter(value);
    }

    performFilter(filterBy: string): IBook[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.books.filter((book: IBook) =>
          book.bookName.toLocaleLowerCase().includes(filterBy));
      }
    toggleImage(): void {
        this.showImage = !this.showImage;
      }
    ngOnInit(): void {
        this.sub = this.BookService.getBooks().subscribe({
          next : books => {
            this.books = books;
            this.filteredBooks = this.books;
          },
          error : err => this.errorMessage =this.errorMessage
        })
    }
    addNewBook(book:IBook):void
    {
      console.log(book);
    }
    onRatingClicked(message: string): void {
        this.pageTitle = 'Book List: ' + message;
      }
    ngOnDestroy(): void{
      this.sub?.unsubscribe();
    }
    newBookAdd():void{
      this.router.navigate(['/newbook']);
    }
    backToWelcome()
    {
      this.router.navigate(['/welcome']);
    }
}