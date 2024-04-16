import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '@shared/models/Product/product';

@Component({
  selector: 'app-home-info-dialog',
  templateUrl: './home-info-dialog.component.html',
  styleUrls: ['./home-info-dialog.component.css'],
})
export class HomeInfoDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Product) {}
}
