import { Component } from '@angular/core';
import { User } from '@shared/models/User/user';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  public currentUser: User = new User();

  constructor(public authService: AuthService) {
    //this.currentUser = authService;
    console.log(this.currentUser);
  }
  logout() {
    this.authService.logout();
  }
}
