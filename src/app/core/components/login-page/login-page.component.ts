import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { UserInfoService } from '../../services/user-info.service';
import { User } from '@shared/models/User/user';

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
    private userInfoService: UserInfoService
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
      this.authService.signIn(this.signInForm.value).subscribe(
        (res) => {},
        (error) => {
          // Handle login error (e.g., show error message)
          console.error('Login error', error);
        }
      );
    } else {
      // Handle form validation errors (e.g., show validation messages)
      console.warn('Sign-in form is not valid');
    }
  }
}
