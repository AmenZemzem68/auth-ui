import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { UserStoreService } from '../../services/user-store.service';
import Toast from '../../helpers/toast';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  users: any[] = [];
  username: string = '';
  role: string = '';
  email: string = '';
  constructor(
    private auth: AuthService,
    private userService: UserService,
    private userStore: UserStoreService
  ) {}
  ngOnInit() {
    this.userService.getUsers().subscribe((res) => {
      this.users = res;
    });

    this.userStore.getUserName().subscribe((value) => {
      let usernameFromToken = this.auth.getUserNameFromToken();
      this.username = value || usernameFromToken;
    });
    this.userStore.getRole().subscribe((value) => {
      let roleFromToken = this.auth.getRoleFromToken();
      this.role = value || roleFromToken;
    });
    this.userStore.getEmail().subscribe((value) => {
      let emailFromToken = this.auth.getEmailFromToken();
      this.email = value || emailFromToken;
    });
  }
  logout() {
    this.auth.logout();
    Toast.showToast('Come Back Soon !!', 'success');
  }
}
