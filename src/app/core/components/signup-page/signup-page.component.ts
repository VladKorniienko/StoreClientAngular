import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {
  public signUpForm !: FormGroup
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.signUpForm = this.formBuilder.group({
      userName: [''],
      password: [''],
      email: ['']
    })
  }
  ngOnInit() { }

  signUp() {
    this.authService.register(this.signUpForm.value).subscribe((res) => {
      //if (res.result) {
      //}
      this.signUpForm.reset();
      this.router.navigate(['login']);
    });
  }

}
