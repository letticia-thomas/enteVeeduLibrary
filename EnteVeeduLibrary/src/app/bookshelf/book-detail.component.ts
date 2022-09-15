import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IAuth } from '../shared/auth';
import { AuthService } from '../shared/auth.service';
import { IBook } from './book';
import { BookService } from './book.service';

@Component({
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class bookDetailComponent implements OnInit {
  pageTitle = 'book Detail';
  errorMessage = '';
  book: IBook | undefined;
  editAuth: boolean = false;
  currentUser: IAuth |undefined;
  bookReader : string |undefined;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private bookService: BookService,
              private auth: AuthService) {
  }
   
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getbook(id);
    }
  }
  getbook(id: number): void {
    this.bookService.getBook(id).subscribe({
      next: book => {this.book = book;
                     this.bookReader =book?.reader;
                     this.currentUser = this.auth.getCurrentUser();
                     const user = this.currentUser?.firstName+ " "+this.currentUser?.lastName;
                     console.log("current user "+user+" and reader is "+ this.bookReader);
                     if(user === this.bookReader )
                     {
                       this.editAuth = true;
                     }
        console.log("subscribed book"+book?.reader)},
      error: err => this.errorMessage = err
    });
  }

  onBack(): void {
    this.router.navigate(['/bookshelf']);
  }

}