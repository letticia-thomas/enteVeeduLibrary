import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BookShelfComponent } from './bookshelf.component';
import { SharedModule } from '../shared/shared.module';
import { bookDetailComponent } from './book-detail.component';
import { BookDetailGuard } from './book-detail.guard';



@NgModule({
  declarations: [
    BookShelfComponent,
    bookDetailComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: 'bookshelf', component: BookShelfComponent },
      {
        path: 'bookshelf/:id',
        canActivate: [BookDetailGuard],
        component: bookDetailComponent
      }
    ]),
  ]
})
export class BookModule { }
