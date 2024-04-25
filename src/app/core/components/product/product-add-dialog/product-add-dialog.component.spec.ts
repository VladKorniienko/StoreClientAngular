import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAddDialogComponent } from './product-add-dialog.component';

describe('ProductAddDialogComponent', () => {
  let component: ProductAddDialogComponent;
  let fixture: ComponentFixture<ProductAddDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductAddDialogComponent],
    });
    fixture = TestBed.createComponent(ProductAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
