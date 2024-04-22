import { Component } from '@angular/core';
import { User } from '@shared/models/User/user';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  public currentUserId: string = '';

  constructor(public authService: AuthService) {
    this.currentUserId = authService.getUserId() || '';
  }
  logout() {
    this.authService.logout().subscribe();
  }
}
