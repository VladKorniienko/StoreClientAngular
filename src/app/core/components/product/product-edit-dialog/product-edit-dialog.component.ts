import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
  public isLoading: boolean = false;
  public genres: Genre[] = [];
  public categories: Category[] = [];
  public screenshotsFiles: File[] = [];
  public screenshotsStrings: string[] = [];
  public iconFile: File = new File([], '');
  public iconString: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public product: Product,
    private prodService: ProductsService,
    private genreService: GenreService,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private snackBarService: SnackbarService,
    private dialogRef: MatDialogRef<ProductEditDialogComponent>
  ) {
    this.editProductForm = this.formBuilder.group({
      id: [product.id],
      name: [product.name, Validators.required],
      priceUSD: [product.priceUSD, Validators.required],
      genre: [product.genre.id, Validators.required],
      category: [product.category.id, Validators.required],
      description: [product.description, Validators.required],
      icon: [''],
      screenshots: [''],
    });
  }

  ngOnInit(): void {
    this.loadGenres();
    this.loadCategories();
    this.initializeScreenshots();
  }

  private loadGenres(): void {
    this.genreService.getGenres().subscribe({
      next: (res) => (this.genres = res),
      error: (err) => console.error('Error loading genres', err),
    });
  }

  private loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (res) => (this.categories = res),
      error: (err) => console.error('Error loading categories', err),
    });
  }

  private initializeScreenshots(): void {
    this.screenshotsStrings = this.product.screenshots;
    this.screenshotsFiles = this.getScreenshotFilesFromStrings();
    this.iconFile = this.getIconFileFromString();
    this.iconString = this.product.icon;
  }

  private getScreenshotFilesFromStrings(): File[] {
    return this.screenshotsStrings.map((binaryString, index) => {
      const bytes = atob(binaryString);
      const array = new Uint8Array(bytes.length);
      for (let i = 0; i < bytes.length; i++) {
        array[i] = bytes.charCodeAt(i);
      }
      const blob = new Blob([array], { type: 'image/jpeg' });
      return new File([blob], `screenshot${index}.jpg`, { type: 'image/jpeg' });
    });
  }

  private getIconFileFromString(): File {
    const binaryString = this.product.icon;
    const bytes = atob(binaryString);
    const array = new Uint8Array(bytes.length);
    for (let i = 0; i < bytes.length; i++) {
      array[i] = bytes.charCodeAt(i);
    }
    const blob = new Blob([array], { type: 'image/jpeg' });
    return new File([blob], 'icon.jpg', { type: 'image/jpeg' });
  }

  public onIconSelected(event: any): void {
    if (event.target.files.length > 0) {
      this.iconFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        const base64Data = base64String.split(',')[1];
        this.iconString = base64Data;
      };
      reader.readAsDataURL(this.iconFile);
    }
  }

  public onScreenshotsSelected(event: any): void {
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        const file = event.target.files[i];
        this.screenshotsFiles.push(file);
        const reader = new FileReader();
        reader.onload = () => {
          const base64String = reader.result as string;
          const base64Data = base64String.split(',')[1];
          this.screenshotsStrings.push(base64Data);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  public deleteScreenshot(index: number): void {
    if (this.screenshotsFiles.length > 1) {
      this.screenshotsFiles.splice(index, 1);
      this.screenshotsStrings.splice(index, 1);
    } else {
      this.snackBarService.openSnackBar(
        'Product must have at least 1 screenshot'
      );
    }
  }

  public updateProduct(): void {
    const formData = new FormData();
    formData.append('Name', this.editProductForm.get('name')!.value);
    formData.append('PriceUSD', this.editProductForm.get('priceUSD')!.value);
    formData.append('GenreId', this.editProductForm.get('genre')!.value);
    formData.append('CategoryId', this.editProductForm.get('category')!.value);
    formData.append(
      'Description',
      this.editProductForm.get('description')!.value
    );
    formData.append('Icon', this.iconFile);
    for (let file of this.screenshotsFiles) {
      formData.append('Screenshots', file, file.name);
    }
    this.isLoading = true;
    this.prodService
      .changeProduct(formData, this.editProductForm.get('id')!.value)
      .subscribe({
        next: () => {
          this.snackBarService.openSnackBar('Product has been edited');
          this.dialogRef.close(true);
          this.isLoading = false;
        },
        error: (err) => {
          this.snackBarService.openSnackBar('Something went wrong');
          this.closeDialog();
          this.isLoading = false;
        },
      });
  }
  closeDialog(): void {
    this.dialogRef.close(false); // Close without a result if the product hasn't changed
    this.isLoading = false;
  }
}
