import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './core/components/login-page/login-page.component';
import { SignupPageComponent } from './core/components/signup-page/signup-page.component';
import { HomeComponent } from './core/components/home/home.component';
import { AuthGuard } from "./shared/guards/auth.guard";
import { UserProfileComponent } from "./core/components/user/user-profile/user-profile.component";

const routes: Routes = [
{ path:"", redirectTo:"login", pathMatch:"full"},
{ path: 'login', component: LoginPageComponent },
{ path: 'signup', component: SignupPageComponent },
{ path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
{ path: 'users/:id', component: UserProfileComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
