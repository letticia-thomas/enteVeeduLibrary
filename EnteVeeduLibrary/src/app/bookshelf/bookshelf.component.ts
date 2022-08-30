import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IBook } from "./book";
import { BookService } from "./book.service";

@Component({
    selector : 'book-shelf',
    templateUrl: './bookshelf.component.html',
    styleUrls: ['./bookshelf.component.css']
})

export class BookShelfComponent implements OnInit{
    pageTitle: String = 'Book Shelf';
    errorMessage = '';
    books : IBook[] =[];
    imageWidth = 50;
    imageMargin = 2;
    showImage = false;
    filteredBooks: IBook[] = [];
    sub : Subscription | undefined;
    constructor(private BookService: BookService)
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
    onRatingClicked(message: string): void {
        this.pageTitle = 'Book List: ' + message;
      }
    ngOnDestroy(): void{
      this.sub?.unsubscribe();
    }
}