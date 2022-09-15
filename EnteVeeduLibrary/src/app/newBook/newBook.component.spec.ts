import { ComponentFixture, TestBed } from '@angular/core/testing';

import { newBookComponent } from './newBook.component';

describe('NewBookComponent', () => {
  let component: newBookComponent;
  let fixture: ComponentFixture<newBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ newBookComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(newBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
