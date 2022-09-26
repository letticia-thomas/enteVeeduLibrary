import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IBook } from '../bookshelf/book';
import { BookService } from '../bookshelf/book.service';

@Component({
  selector: 'pm-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent implements OnInit {

  updateBookForm: FormGroup
  bookId: Number


  constructor(private router: Router,
    private route: ActivatedRoute,
    private bookService: BookService,
    private formBuilder: FormBuilder) {

    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.bookId =id;
    this.updateBookForm = this.formBuilder.group({
      bookName: [''],
      language: [''],
      author: [''],
      description: [''],
      starRating: [''],
      price: [''],
      availableOn:[''],
      imageUrl:['']
    })

    if (id) {
      this.bookService.getBook(id).subscribe({
        next: book => {
          this.updateBookForm.patchValue(book!);
          console.log("book name updating" + this.updateBookForm.getRawValue())
        },
      });
    }

  }

  ngOnInit(): void {

  }

  backToShelf() {
    this.router.navigate(['/bookshelf']);
  }
  editBook(formValue: IBook | any) {
    formValue.id = this.bookId;
    this.bookService.updateBook(formValue);
    this.backToShelf();
  }
  deleteBook(){
    console.log("delete clicked!")
    this.bookService.deleteBook(this.bookId);
    this.backToShelf();
  }

}
