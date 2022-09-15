import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BookShelfComponent } from './bookshelf.component';
import { SharedModule } from '../shared/shared.module';
import { bookDetailComponent } from './book-detail.component';
import { BookDetailGuard } from './book-detail.guard';
import { newBookComponent } from '../newBook/newBook.component';
import { FormsModule } from '@angular/forms';
import { NewUserComponent } from '../new-user/new-user.component';




@NgModule({
  declarations: [
    BookShelfComponent,
    bookDetailComponent,
    newBookComponent,
    NewUserComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'bookshelf', component: BookShelfComponent },
      {
        path: 'bookshelf/:id',
       canActivate: [BookDetailGuard],
        component: bookDetailComponent
      },
      {
        path: 'newbook',
        component: newBookComponent
      },
      { path: 'newuser', component: NewUserComponent}
    ]),
  ]
  
})
export class BookModule { }
