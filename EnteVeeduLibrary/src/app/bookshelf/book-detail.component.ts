import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private route: ActivatedRoute,
              private router: Router,
              private bookService: BookService) {
  }
   
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getbook(id);
    }
  }

  getbook(id: number): void {
    this.bookService.getBook(id).subscribe({
      next: book => this.book = book,
      error: err => this.errorMessage = err
    });
  }

  onBack(): void {
    this.router.navigate(['/bookshelf']);
  }

}