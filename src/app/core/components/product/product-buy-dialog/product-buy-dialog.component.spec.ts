import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBuyDialogComponent } from './product-buy-dialog.component';

describe('ProductBuyDialogComponent', () => {
  let component: ProductBuyDialogComponent;
  let fixture: ComponentFixture<ProductBuyDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductBuyDialogComponent],
    });
    fixture = TestBed.createComponent(ProductBuyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
