import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './core/components/login-page/login-page.component';
import { SignupPageComponent } from './core/components/signup-page/signup-page.component';
import { HomeComponent } from './core/components/home/home.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { UserProfileComponent } from './core/components/user/user-profile/user-profile.component';
import { LoggedInGuard } from '@shared/guards/logged-in.guard';
import { LibraryComponent } from './core/components/user/library/library.component';
import { AdminPanelUserComponent } from './core/components/admin/admin-panel-user/admin-panel-user.component';
import { RoleGuard } from '@shared/guards/role.guard';
import { AdminPanelProductComponent } from './core/components/admin/admin-panel-product/admin-panel-product.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [LoggedInGuard],
  },
  {
    path: 'signup',
    component: SignupPageComponent,
    canActivate: [LoggedInGuard],
  },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'users/:id',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'library',
    component: LibraryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin-panel-user',
    component: AdminPanelUserComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: 'admin-panel-product',
    component: AdminPanelProductComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
