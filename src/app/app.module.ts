import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupPageComponent } from './core/components/signup-page/signup-page.component';
import { LoginPageComponent } from './core/components/login-page/login-page.component';
import { HomeComponent } from './core/components/home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/interceptors/authconfig.interceptor';
import { UserProfileComponent } from './core/components/user/user-profile/user-profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HeaderComponent } from './core/components/header/header.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { ProductInfoDialogComponent } from './core/components/product/product-info-dialog/product-info-dialog.component';
import { ProductBuyDialogComponent } from './core/components/product/product-buy-dialog/product-buy-dialog.component';
import { ProductAddDialogComponent } from './core/components/product/product-add-dialog/product-add-dialog.component';
import { LibraryComponent } from './core/components/user/library/library.component';
import { AdminPanelUserComponent } from './core/components/admin/admin-panel-user/admin-panel-user.component';
import { UserEditDialogComponent } from './core/components/user/user-edit-dialog/user-edit-dialog.component';
import { MatChipsModule } from '@angular/material/chips';
import { AdminPanelProductComponent } from './core/components/admin/admin-panel-product/admin-panel-product.component';
import { ProductEditDialogComponent } from './core/components/product/product-edit-dialog/product-edit-dialog.component';
import { UserBalanceDialogComponent } from './core/components/user/user-balance-dialog/user-balance-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupPageComponent,
    LoginPageComponent,
    HomeComponent,
    UserProfileComponent,
    HeaderComponent,
    ProductInfoDialogComponent,
    ProductBuyDialogComponent,
    ProductAddDialogComponent,
    LibraryComponent,
    AdminPanelUserComponent,
    UserEditDialogComponent,
    AdminPanelProductComponent,
    ProductEditDialogComponent,
    UserBalanceDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatGridListModule,
    MatMenuModule,
    MatChipsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatToolbarModule,
    MatDialogModule,
    MatTabsModule,
    MatInputModule,
    MatTableModule,
    MatBadgeModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatPaginatorModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
