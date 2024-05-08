import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Category } from '@shared/models/Category/category';
import { Genre } from '@shared/models/Genre/genre';
import { Product } from '@shared/models/Product/product';
import { CategoryService } from 'src/app/core/services/category.service';
import { GenreService } from 'src/app/core/services/genre.service';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-product-edit-dialog',
  templateUrl: './product-edit-dialog.component.html',
  styleUrls: ['./product-edit-dialog.component.css'],
})
export class ProductEditDialogComponent implements OnInit {
  public editProductForm: FormGroup;
  public genres: Array<Genre>;
  public categories: Array<Category>;
  public screenshots: File[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public product: Product,
    public prodService: ProductsService,
    public genreService: GenreService,
    public router: Router,
    public categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    this.genres = new Array<Genre>();
    this.categories = new Array<Category>();
    this.editProductForm = this.formBuilder.group({
      id: product.id,
      name: product.name,
      priceUSD: product.priceUSD,
      genre: product.genre.id,
      category: product.category.id,
      description: product.description,
      icon: product.icon,
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
    this.getScreenshotFilesFromStrings();
  }

  getScreenshotFilesFromStrings() {
    let files: File[] = this.product.screenshots.map((binaryString, index) => {
      let array = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        array[i] = binaryString.charCodeAt(i);
      }
      let blob = new Blob([array], { type: 'image/jpeg' });

      // Create a file from the blob
      let file = new File([blob], `screenshot${index}.jpg`, {
        type: 'image/jpeg',
      });

      return file;
    });
    this.editProductForm.get('screenshots')?.setValue(files);
    this.screenshots = files;
  }
  onIconSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.editProductForm.get('icon')?.setValue(file);
    }
  }

  onScreenshotsSelected(event: any) {
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.screenshots.push(event.target.files[i]);
      }
    }
  }

  deleteScreenshot(index: number) {
    if (this.screenshots.length > 1) {
      this.screenshots.splice(index, 1);
    } else {
      this.openSnackBar('Product must have at least 1 screenshot');
    }
  }
  openSnackBar(message: string) {
    this._snackBar.open(message, 'OK');
  }
  updateProduct() {
    const formData = new FormData();
    formData.append('Name', this.editProductForm.get('name')?.value);
    formData.append('PriceUSD', this.editProductForm.get('priceUSD')?.value);
    formData.append('GenreId', this.editProductForm.get('genre')?.value);
    formData.append('CategoryId', this.editProductForm.get('category')?.value);
    formData.append(
      'Description',
      this.editProductForm.get('description')?.value
    );
    formData.append('Icon', this.editProductForm.get('icon')?.value);
    for (let file of this.screenshots) {
      formData.append('Screenshots', file, file.name);
    }
    this.prodService
      .changeProduct(formData, this.editProductForm.get('id')?.value)
      .subscribe(
        () => {
          this.openSnackBar('Product has been edited');
          // Handle successful product addition
        },
        (error) => {
          console.error('Error editing product', error);
          // Handle error during product addition
        }
      );
  }
}
