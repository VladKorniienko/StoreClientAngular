import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '@shared/models/User/user';
import { UserService } from '../../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '@shared/models/Product/product';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UserEditDialogComponent } from '../../user/user-edit-dialog/user-edit-dialog.component';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { UserDataService } from 'src/app/core/services/user-data.service';

@Component({
  selector: 'app-admin-panel-user',
  templateUrl: './admin-panel-user.component.html',
  styleUrls: ['./admin-panel-user.component.css'],
})
export class AdminPanelUserComponent implements OnInit {
  public isLoading: boolean = true;
  public columnsToDisplay: string[] = [
    'userName',
    'email',
    'role',
    'balance',
    'actions',
  ];
  public dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    public userService: UserService,
    public userDataService: UserDataService,
    public dialog: MatDialog,
    private snackBarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  openEditUserDialog(user: User): void {
    const dialogRef = this.dialog.open(UserEditDialogComponent, {
      data: user,
      width: '1000px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (user.id === this.userDataService.getCurrentUser().id) {
          this.userService.getUser(user.id).subscribe(
            (updatedUser: User) => {
              this.userDataService.setCurrentUser(updatedUser);
            },
            (error) => {
              console.error('Error fetching user:', error);
            }
          );
        }
        this.loadUsers();
      }
    });
  }

  makeAdmin(user: User): void {
    if (user.role !== 'Admin') {
      this.userService.makeAdmin(user.id).subscribe(() => {
        this.snackBarService.openSnackBar(
          `User ${user.userName} is now an admin.`
        );
        this.loadUsers();
      });
    } else {
      this.snackBarService.openSnackBar(
        `User ${user.userName} is already an admin.`
      );
    }
  }

  revokeAdmin(user: User): void {
    if (user.role === 'Admin') {
      this.userService.revokeAdmin(user.id).subscribe(() => {
        this.snackBarService.openSnackBar(
          `User ${user.userName} is no longer an admin.`
        );
        this.loadUsers();
      });
    } else {
      this.snackBarService.openSnackBar(
        `User ${user.userName} is not an admin.`
      );
    }
  }

  deleteUser(user: User): void {
    this.userService.deleteUser(user.id).subscribe(() => {
      this.snackBarService.openSnackBar(
        `User ${user.userName} has been successfully deleted.`
      );
      this.loadUsers();
    });
  }

  private loadUsers(): void {
    this.isLoading = true;
    this.userService.getUsers().subscribe((users) => {
      this.dataSource.data = users;
      this.dataSource.paginator = this.paginator;
      this.isLoading = false;
    });
  }
}
