import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '@shared/models/User/user';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '@shared/models/Product/product';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
})
export class AdminPanelComponent implements OnInit {
  public columnsToDisplay = ['userName', 'email', 'role', 'balance'];
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

  ngOnInit(): void {
    this.userService.getUsers().subscribe((res) => {
      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator;
    });
  }
}
