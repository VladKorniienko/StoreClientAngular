import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './core/components/login-page/login-page.component';
import { SignupPageComponent } from './core/components/signup-page/signup-page.component';
import { HomeComponent } from './core/components/home/home.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { UserProfileComponent } from './core/components/user/user-profile/user-profile.component';
import { LoggedInGuard } from '@shared/guards/logged-in.guard';
import { LibraryComponent } from './core/components/user/library/library.component';
import { AdminPanelComponent } from './core/components/admin-panel/admin-panel.component';
import { RoleGuard } from '@shared/guards/role.guard';

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
    path: 'admin-panel',
    component: AdminPanelComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
