import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { User } from '@shared/models/User/user';
import { UserService } from '../../services/user.service';
import { catchError, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  public signInForm: FormGroup;
  public hide = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {
    this.signInForm = this.createSignInForm();
  }

  ngOnInit(): void {}

  private createSignInForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  public logIn(): void {
    if (this.signInForm.valid) {
      this.authService
        .signIn(this.signInForm.value)
        .pipe(
          switchMap((signInResponse) => {
            // Assuming signInResponse contains user ID or relevant information
            return this.userService.getUser(signInResponse.id);
          })
        )
        .subscribe(
          (user) => {
            // Update user after successful login
            this.userService.updateUser(user);
          },
          (error) => {
            // Handle error
            console.error('Error fetching user after login:', error);
          }
        );
    } else {
      // Handle form validation errors (e.g., show validation messages)
      console.warn('Sign-in form is not valid');
    }
  }
}
