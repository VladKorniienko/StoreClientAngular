import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@shared/services/auth.service';


@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent  implements OnInit{
public signUpForm !: FormGroup
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) 
  { 
    this.signUpForm = this.formBuilder.group({
      userName: [''],
      password: [''],
      email: ['']
    })
  }
  ngOnInit() {}
  
  signUp() {
    this.authService.signUp(this.signUpForm.value).subscribe((res) => {
      //if (res.result) {
      //}
      this.signUpForm.reset();
      this.router.navigate(['login']);
    });
  }

}
