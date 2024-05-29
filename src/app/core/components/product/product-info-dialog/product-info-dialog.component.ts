import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '@shared/models/Product/product';

@Component({
  selector: 'app-product-info-dialog',
  templateUrl: './product-info-dialog.component.html',
  styleUrls: ['./product-info-dialog.component.css'],
})
export class ProductInfoDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Product) {}

  currentIndex = 0;
  showNextImage() {
    if (this.currentIndex < this.data.screenshots.length - 1) {
      this.currentIndex++;
    }
  }

  showPreviousImage() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }
}
