import { ComponentFixture, TestBed } from '@angular/core/testing';

import { bookDetailComponent } from './book-detail.component';

describe('BookDetailComponent', () => {
  let component: bookDetailComponent;
  let fixture: ComponentFixture<bookDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ bookDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(bookDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
