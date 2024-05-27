import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css'],
})
export class SignupPageComponent implements OnInit {
  public signUpForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signUpForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {}

  signUp(): void {
    if (this.signUpForm.invalid) {
      // Handle invalid form submission
      return;
    }

    this.authService.register(this.signUpForm.value).subscribe({
      next: () => {
        this.signUpForm.reset();
        this.router.navigate(['login']);
      },
      error: (error) => {
        // Handle registration error
        console.error('Error during registration:', error);
      },
    });
  }
}
