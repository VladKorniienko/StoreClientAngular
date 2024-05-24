import { Component } from '@angular/core';
import { User } from '@shared/models/User/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { UserBalanceDialogComponent } from '../user/user-balance-dialog/user-balance-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  public currentUserId: string = '';
  currentUser: User = new User();
  constructor(
    public authService: AuthService,
    public userService: UserService,
    public dialog: MatDialog
  ) {
    this.currentUserId = authService.getUserId() || '';
    this.userService.getUser(this.currentUserId).subscribe((res: User) => {
      this.currentUser = res;
    });
  }
  logout() {
    this.authService.logout().subscribe();
  }
  openEditBalanceDialog() {
    this.dialog.open(UserBalanceDialogComponent, {
      data: this.currentUser,
      width: '400px',
    });
  }
}
