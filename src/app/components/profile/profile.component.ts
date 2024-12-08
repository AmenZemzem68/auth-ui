import { Component, OnInit } from '@angular/core';
import { UserStoreService } from '../../services/user-store.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  username: string = '';
  role: string = '';

  constructor(private userStore: UserStoreService, private auth: AuthService) {}
  ngOnInit(): void {
    this.userStore.getUserName().subscribe((username) => {
      this.username =
        username || this.auth.getUserNameFromToken() || 'Default Username';
    });

    this.userStore.getRole().subscribe((role) => {
      this.role = role || this.auth.getRoleFromToken() || 'Default Role';
    });
  }
}
