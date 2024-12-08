import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  private userName$ = new BehaviorSubject<string>('');
  private role$ = new BehaviorSubject<string>('');
  private email$ = new BehaviorSubject<string>('');

  constructor() {}

  getRole() {
    return this.role$.asObservable();
  }
  setRole(role: string) {
    this.role$.next(role);
  }
  getUserName() {
    return this.userName$.asObservable();
  }
  setUserName(username: string) {
    this.userName$.next(username);
  }
  getEmail() {
    return this.email$.asObservable();
  }
  setEmail(email: string) {
    this.email$.next(email);
  }
}
