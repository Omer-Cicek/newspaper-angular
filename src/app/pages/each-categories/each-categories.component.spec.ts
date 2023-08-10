import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EachCategoriesComponent } from './each-categories.component';

describe('EachCategoriesComponent', () => {
  let component: EachCategoriesComponent;
  let fixture: ComponentFixture<EachCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EachCategoriesComponent]
    });
    fixture = TestBed.createComponent(EachCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
