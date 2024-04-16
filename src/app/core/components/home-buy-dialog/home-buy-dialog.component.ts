import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Product } from '@shared/models/Product/product';

@Component({
  selector: 'app-home-buy-dialog',
  templateUrl: './home-buy-dialog.component.html',
  styleUrls: ['./home-buy-dialog.component.css']
})
export class HomeBuyDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Product) {}
}
