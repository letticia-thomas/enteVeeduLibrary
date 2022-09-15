import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IBook } from '../bookshelf/book';
import { BookService } from '../bookshelf/book.service';

@Component({
  selector: 'pm-newBook',
  templateUrl: './newBook.component.html',
  styleUrls: ['./newBook.component.css']
})
export class newBookComponent implements OnInit {
   
  newBook = {} as IBook;
  bookName : string = '';
  author: string ='';
  sub : Subscription | undefined;

  @Output() addNewBook = new EventEmitter();

  constructor(private bookService : BookService,private router: Router) { }

  ngOnInit(): void {
  }

  saveBook(formValue: IBook):void{

    if(formValue.bookName && formValue.author  && formValue.language && formValue.price && formValue.starRating)
    {
         this.newBook =formValue;
         this.sub=this.bookService.saveBook(formValue).subscribe({});
         this.router.navigate(['/bookshelf']);
    }
    else{
      alert("please fill necessary information!")
    }

  } 
  backToShelf():void{
    this.router.navigate(['/bookshelf']);
  }

}
