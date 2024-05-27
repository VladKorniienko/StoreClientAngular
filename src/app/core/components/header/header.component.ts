import { Component, OnInit } from '@angular/core';
import { User } from '@shared/models/User/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { UserBalanceDialogComponent } from '../user/user-balance-dialog/user-balance-dialog.component';
import { UserInfoService } from '../../services/user-info.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  currentUser: User = new User();

  constructor(
    public authService: AuthService,
    private userService: UserService,
    private dialog: MatDialog,
    private userInfoService: UserInfoService
  ) {}

  ngOnInit(): void {
    this.loadCurrentUser();
    this.userInfoService.userUpdated$.subscribe((user: User) => {
      if (user) {
        this.currentUser = user;
      }
    });
  }

  private loadCurrentUser(): void {
    const currentUserId = this.authService.getUserId();
    if (currentUserId) {
      this.userService.getUser(currentUserId).subscribe((user: User) => {
        this.currentUser = user;
        this.userInfoService.updateUser(user); // Ensure user info is updated across the app
      });
    }
  }

  logout(): void {
    this.authService.logout().subscribe();
  }

  openEditBalanceDialog(): void {
    const dialogRef = this.dialog.open(UserBalanceDialogComponent, {
      data: this.currentUser,
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result: number | undefined) => {
      if (result !== undefined) {
        // Ensure result is not undefined (if the user canceled the dialog)
        this.currentUser.balance = result;
      }
    });
  }
}
