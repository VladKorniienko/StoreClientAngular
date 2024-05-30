import { Injectable } from '@angular/core';
import { User } from '@shared/models/User/user';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor() {
    const userData = localStorage.getItem('currentUser');
    const user = userData ? JSON.parse(userData) : new User();
    this.currentUserSubject = new BehaviorSubject<User>(user);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  setCurrentUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  clearCurrentUser(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(new User());
  }
}
