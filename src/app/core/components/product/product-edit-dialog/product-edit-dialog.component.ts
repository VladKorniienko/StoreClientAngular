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
import { SnackbarService } from 'src/app/core/services/snackbar.service';

@Component({
  selector: 'app-product-edit-dialog',
  templateUrl: './product-edit-dialog.component.html',
  styleUrls: ['./product-edit-dialog.component.css'],
})
export class ProductEditDialogComponent implements OnInit {
  public editProductForm: FormGroup;
  public genres: Array<Genre>;
  public categories: Array<Category>;
  public screenshotsFiles: Array<File> = [];
  public screenshotsStrings: Array<string> = [];
  public iconFile: File = new File([], '');
  constructor(
    @Inject(MAT_DIALOG_DATA) public product: Product,
    public prodService: ProductsService,
    public genreService: GenreService,
    public router: Router,
    public categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private snackBarService: SnackbarService
  ) {
    this.genres = new Array<Genre>();
    this.categories = new Array<Category>();
    this.screenshotsStrings = this.product.screenshots;
    this.screenshotsFiles = this.getScreenshotFilesFromStrings();
    this.iconFile = this.getIconFileFromString();

    this.editProductForm = this.formBuilder.group({
      id: product.id,
      name: product.name,
      priceUSD: product.priceUSD,
      genre: product.genre.id,
      category: product.category.id,
      description: product.description,
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
    this.getScreenshotFilesFromStrings();
  }

  getScreenshotFilesFromStrings(): File[] {
    let files: File[] = this.screenshotsStrings.map((binaryString, index) => {
      // Convert the base64 string to a Uint8Array
      const bytes = atob(binaryString);
      const array = new Uint8Array(bytes.length);

      // Populate the Uint8Array with the binary data
      for (let i = 0; i < bytes.length; i++) {
        array[i] = bytes.charCodeAt(i);
      }

      // Create a Blob from the Uint8Array
      const blob = new Blob([array], { type: 'image/jpeg' });

      // Create a File object from the Blob
      const file = new File([blob], `screenshot${index}.jpg`, {
        type: 'image/jpeg',
      });

      return file;
    });
    return files;
  }

  getIconFileFromString(): File {
    const binaryString = this.product.icon; // assuming screenshotsString is a single base64 string

    // Convert the base64 string to a Uint8Array
    const bytes = atob(binaryString);
    const array = new Uint8Array(bytes.length);

    // Populate the Uint8Array with the binary data
    for (let i = 0; i < bytes.length; i++) {
      array[i] = bytes.charCodeAt(i);
    }

    // Create a Blob from the Uint8Array
    const blob = new Blob([array], { type: 'image/jpeg' });

    // Create a File object from the Blob
    const file = new File([blob], 'icon.jpg', {
      type: 'image/jpeg',
    });
    return file;
  }

  onIconSelected(event: any) {
    if (event.target.files.length > 0) {
      this.iconFile = event.target.files[0];
    }
  }

  onScreenshotsSelected(event: any) {
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.screenshotsFiles.push(event.target.files[i]);
        const reader = new FileReader();
        reader.onload = () => {
          const base64String = reader.result as string;
          const base64Data = base64String.split(',')[1];
          this.screenshotsStrings.push(base64Data);
        };
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  deleteScreenshot(index: number) {
    if (this.screenshotsFiles.length > 1) {
      this.screenshotsFiles.splice(index, 1);
      this.screenshotsStrings.splice(index, 1);
    } else {
      this.snackBarService.openSnackBar(
        'Product must have at least 1 screenshot'
      );
    }
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
    formData.append('Icon', this.iconFile);
    for (let file of this.screenshotsFiles) {
      formData.append('Screenshots', file, file.name);
    }
    this.prodService
      .changeProduct(formData, this.editProductForm.get('id')?.value)
      .subscribe(
        () => {
          this.snackBarService.openSnackBar('Product has been edited');
          // Handle successful product addition
        },
        (error) => {
          console.error('Error editing product', error);
          // Handle error during product addition
        }
      );
  }
}
