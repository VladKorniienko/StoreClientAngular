import { Injectable } from '@angular/core';
import { User } from '@shared/models/User/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  private userStateSource = new BehaviorSubject<User>(new User());
  userUpdated$ = this.userStateSource.asObservable();

  updateUser(user: User) {
    this.userStateSource.next(user);
  }

  constructor() {}
}
