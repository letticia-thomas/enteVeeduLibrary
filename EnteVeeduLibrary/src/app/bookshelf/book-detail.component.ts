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
  pageTitle = 'Book Detail';
  errorMessage = '';
  book?: IBook;
  editAuth: boolean = false;
  currentUser: IAuth | undefined;
  bookReader: string | undefined;
  isAvailable: boolean = false;
  user: string | undefined;
  isReturn: boolean = false;

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
      next: book => {
        this.book = book;
        this.bookReader = book?.reader;
        this.currentUser = this.auth.getCurrentUser();
        this.user = this.currentUser?.firstName + " " + this.currentUser?.lastName;
        if (this.user === this.bookReader) {
          this.editAuth = true;
        }
        if (this.user === this.book?.currentReader) {
          this.isReturn = true;
        }
        if (!book?.currentReader) {
          this.isAvailable = true;
        }
      },
      error: err => this.errorMessage = err
    });
  }

  onBack(): void {
    this.router.navigate(['/bookshelf']);
  }
  edit(): void {
    this.router.navigate(['/edit', this.book?.id]);
  }

  readTheBook() {
    let canUpdated: boolean = true;
    const currentUser = this.auth.getCurrentUser();
    if (this.book != undefined) {
      if (currentUser?.bookCount) {
        if (currentUser.bookCount >= 2) {
          canUpdated = false
          alert('You are holding maximum books at this moment');

        }
        else {
          currentUser.bookCount++;
        }

      }
      else if (currentUser) {
        currentUser.bookCount = 1;
      }
    }
    if (canUpdated)
    {
      this.bookService.updateReader(this.book?.id, this.book);
     // this.auth.updateUser(currentUser);
    }
  this.onBack();
  }
  returnBook() {
    let isUpdated: boolean = false;
    isUpdated = this.bookService.removeReader(this.book?.id, this.book);
    this.onBack();
  }
}