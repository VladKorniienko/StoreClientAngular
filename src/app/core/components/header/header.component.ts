import { Component, OnInit } from '@angular/core';
import { User } from '@shared/models/User/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { UserBalanceDialogComponent } from '../user/user-balance-dialog/user-balance-dialog.component';
import { NavigationEnd, Router } from '@angular/router';
import { UserDataService } from '../../services/user-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userInfo: User = new User();

  constructor(
    public authService: AuthService,
    private userService: UserService,
    private userDataService: UserDataService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userDataService.currentUser.subscribe((user) => {
      this.userInfo = user;
    });
  }

  private loadCurrentUser(): void {
    const currentUserId = this.authService.getUserId();
  }

  logout(): void {
    this.authService.logout().subscribe();
  }

  openEditBalanceDialog(): void {
    const dialogRef = this.dialog.open(UserBalanceDialogComponent, {
      data: this.userInfo,
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result: number | undefined) => {
      if (result !== undefined) {
        // Ensure result is not undefined (if the user canceled the dialog)
        this.userInfo.balance = result;
      }
    });
  }
}
