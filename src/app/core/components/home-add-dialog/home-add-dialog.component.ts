import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductsService } from 'src/app/core/services/products.service';
import { HttpEventType } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home-add-dialog',
  templateUrl: './home-add-dialog.component.html',
  styleUrls: ['./home-add-dialog.component.css'],
})
export class HomeAddDialogComponent {
  public AddProductForm!: FormGroup;
  uploadedImage!: File;

  constructor(
    @Inject(MAT_DIALOG_DATA) public prodService: ProductsService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    this.AddProductForm = this.formBuilder.group({
      Name: '',
      PriceUSD: '',
      Genre: '',
      Category: '',
      Description: '',
    });
  }

  onFileSelected(event: any) {
    this.uploadedImage = event.target.files[0];
  }

  openSnackBar() {
    this._snackBar.open('Product has been added', 'OK');
  }

  addProducts() {
    this.openSnackBar();
    let prodFormData = new FormData();
    prodFormData.append('name', this.AddProductForm.value.Name);
    prodFormData.append('priceUSD', this.AddProductForm.value.PriceUSD);
    prodFormData.append('genre', this.AddProductForm.value.Genre);
    prodFormData.append('category', this.AddProductForm.value.Category);
    prodFormData.append('description', this.AddProductForm.value.Description);
    prodFormData.append(
      'iconImage',
      this.uploadedImage,
      this.uploadedImage.name
    );

    this.prodService.addProduct(prodFormData).subscribe((res) => {
      console.log(res);
    });
  }
}
