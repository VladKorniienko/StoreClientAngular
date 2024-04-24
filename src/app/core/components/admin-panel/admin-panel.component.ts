import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '@shared/models/User/user';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '@shared/models/Product/product';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UserEditDialogComponent } from '../user/user-edit-dialog/user-edit-dialog.component';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
})
export class AdminPanelComponent implements OnInit {
  public columnsToDisplay = ['userName', 'email', 'role', 'balance', 'actions'];
  public usersToDisplay: Array<User>;
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    public userService: UserService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.usersToDisplay = new Array<User>();
    this.dataSource = new MatTableDataSource();
  }

  openEditUserDialog(user: User) {
    this.dialog.open(UserEditDialogComponent, {
      data: user,
      height: '600px',
      width: '800px',
    });
  }
  openSnackBar(message: string) {
    this._snackBar.open(message, 'OK');
  }
  makeAdmin(user: User) {
    if (user.role !== 'Admin') {
      this.userService.makeAdmin(user.id).subscribe((res) => {
        this.openSnackBar(`User ${user.userName} is now an admin.`);
      });
    } else {
      this.openSnackBar(`User ${user.userName} is already an admin.`);
    }
  }
  revokeAdmin(user: User) {
    if (user.role == 'Admin') {
      this.userService.revokeAdmin(user.id).subscribe((res) => {
        this.openSnackBar(`User ${user.userName} is no longer an admin.`);
      });
    } else {
      this.openSnackBar(`User ${user.userName} is not an admin.`);
    }
  }
  deleteUser(user: User) {
    this.userService.deleteUser(user.id).subscribe((res) => {
      this.openSnackBar(`User ${user.userName} has been successfully deleted.`);
    });
  }
  ngOnInit(): void {
    this.userService.getUsers().subscribe((res) => {
      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator;
    });
  }
}
