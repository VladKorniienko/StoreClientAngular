import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductsService } from 'src/app/core/services/products.service';
import { HttpEventType } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreService } from '../../../services/genre.service';
import { Genre } from '@shared/models/Genre/genre';
import { CategoryService } from '../../../services/category.service';
import { Category } from '@shared/models/Category/category';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/core/services/snackbar.service';

@Component({
  selector: 'app-product-add-dialog',
  templateUrl: './product-add-dialog.component.html',
  styleUrls: ['./product-add-dialog.component.css'],
})
export class ProductAddDialogComponent implements OnInit {
  public addProductForm: FormGroup;
  public genres: Genre[] = [];
  public categories: Category[] = [];
  public screenshotsFiles: File[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public prodService: ProductsService,
    private genreService: GenreService,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private snackBarService: SnackbarService
  ) {
    this.addProductForm = this.formBuilder.group({
      name: ['', Validators.required],
      priceUSD: ['', [Validators.required]],
      genre: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      icon: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadGenres();
    this.loadCategories();
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

  public onIconSelected(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.addProductForm.get('icon')?.setValue(file);
    }
  }

  public onScreenshotsSelected(event: any): void {
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        const file = event.target.files[i];
        this.screenshotsFiles.push(file);
      }
    }
  }

  public addProduct() {
    if (this.addProductForm.invalid) {
      this.snackBarService.openSnackBar(
        'Please fill in all required fields',
        'OK'
      );
      return;
    }

    const formData = new FormData();
    formData.append('Name', this.addProductForm.get('name')?.value);
    formData.append('PriceUSD', this.addProductForm.get('priceUSD')?.value);
    formData.append('GenreId', this.addProductForm.get('genre')?.value);
    formData.append('CategoryId', this.addProductForm.get('category')?.value);
    formData.append(
      'Description',
      this.addProductForm.get('description')?.value
    );
    formData.append('Icon', this.addProductForm.get('icon')?.value);
    for (let file of this.screenshotsFiles) {
      formData.append('Screenshots', file, file.name);
    }
    this.prodService.addProduct(formData).subscribe({
      next: () => {
        this.snackBarService.openSnackBar('Product has been added', 'OK');
      },
      error: (err) => console.error('Error adding product', err),
    });
  }
}
