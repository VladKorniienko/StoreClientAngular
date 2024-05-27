import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './core/components/login-page/login-page.component';
import { SignupPageComponent } from './core/components/signup-page/signup-page.component';
import { HomeComponent } from './core/components/home/home.component';
import { authGuard } from './shared/guards/auth.guard';
import { UserProfileComponent } from './core/components/user/user-profile/user-profile.component';
import { loggedInGuard } from '@shared/guards/logged-in.guard';
import { LibraryComponent } from './core/components/user/library/library.component';
import { AdminPanelUserComponent } from './core/components/admin/admin-panel-user/admin-panel-user.component';
import { roleGuard } from '@shared/guards/role.guard';
import { AdminPanelProductComponent } from './core/components/admin/admin-panel-product/admin-panel-product.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [loggedInGuard],
  },
  {
    path: 'signup',
    component: SignupPageComponent,
    canActivate: [loggedInGuard],
  },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  {
    path: 'users/:id',
    component: UserProfileComponent,
    canActivate: [authGuard],
  },
  {
    path: 'library',
    component: LibraryComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin-panel-user',
    component: AdminPanelUserComponent,
    canActivate: [authGuard, roleGuard],
  },
  {
    path: 'admin-panel-product',
    component: AdminPanelProductComponent,
    canActivate: [authGuard, roleGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
