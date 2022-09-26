import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BookShelfComponent } from './bookshelf.component';
import { SharedModule } from '../shared/shared.module';
import { bookDetailComponent } from './book-detail.component';
import { BookDetailGuard } from './book-detail.guard';
import { newBookComponent } from '../newBook/newBook.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewUserComponent } from '../new-user/new-user.component';
import { UpdateBookComponent } from '../update-book/update-book.component';
import { ProfileDetailsComponent } from '../profile-details/profile-details.component';
import { allMembersComponent } from '../shared/allMembers.compnent';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    BookShelfComponent,
    bookDetailComponent,
    newBookComponent,
    NewUserComponent,
    UpdateBookComponent,
    ProfileDetailsComponent,
    allMembersComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
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
      { path: 'newuser', component: NewUserComponent},
      { path: 'edit/:id', component: UpdateBookComponent},
      { path: 'profile', component: ProfileDetailsComponent},
    ]),
  ],
})
export class BookModule { }
