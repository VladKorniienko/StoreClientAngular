import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductsService } from 'src/app/core/services/products.service';
import { HttpEventType } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreService } from '../../../services/genre.service';
import { Genre } from '@shared/models/Genre/genre';
import { CategoryService } from '../../../services/category.service';
import { Category } from '@shared/models/Category/category';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-add-dialog',
  templateUrl: './product-add-dialog.component.html',
  styleUrls: ['./product-add-dialog.component.css'],
})
export class ProductAddDialogComponent implements OnInit {
  public AddProductForm: FormGroup;
  public genres: Array<Genre>;
  public categories: Array<Category>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public prodService: ProductsService,
    public genreService: GenreService,
    public router: Router,
    public categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    this.genres = new Array<Genre>();
    this.categories = new Array<Category>();
    this.AddProductForm = this.formBuilder.group({
      name: '',
      priceUSD: '',
      genre: '',
      category: '',
      description: '',
      icon: '',
      screenshots: [''],
    });
  }
  ngOnInit(): void {
    this.genreService.getGenres().subscribe((res) => {
      this.genres = res;
    });
    this.categoryService.getCategories().subscribe((res) => {
      this.categories = res;
    });
  }

  onIconSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.AddProductForm.get('icon')?.setValue(file);
    }
  }

  onScreenshotsSelected(event: any) {
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.AddProductForm.get('screenshots')?.patchValue(
          event.target.files[i]
        );
      }
    }
  }

  openSnackBar() {
    this._snackBar.open('Product has been added', 'OK');
  }
  addProducts() {
    const formData = new FormData();
    formData.append('Name', this.AddProductForm.get('name')?.value);
    formData.append('PriceUSD', this.AddProductForm.get('priceUSD')?.value);
    formData.append('GenreId', this.AddProductForm.get('genre')?.value);
    formData.append('CategoryId', this.AddProductForm.get('category')?.value);
    formData.append(
      'Description',
      this.AddProductForm.get('description')?.value
    );
    formData.append('Icon', this.AddProductForm.get('icon')?.value);
    formData.append(
      'Screenshots',
      this.AddProductForm.get('screenshots')?.value
    );

    this.prodService.addProduct(formData).subscribe(
      () => {
        this.openSnackBar();
        // Handle successful product addition
      },
      (error) => {
        console.error('Error adding product', error);
        // Handle error during product addition
      }
    );
  }
}
