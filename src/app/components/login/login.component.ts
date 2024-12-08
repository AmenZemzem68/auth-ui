import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import ValidateForms from '../../helpers/validateforms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Toast from '../../helpers/toast';
import { UserStoreService } from '../../services/user-store.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  isText: boolean = false;
  icon: string = 'fa-eye-slash';
  type: string = 'password';
  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private userStore: UserStoreService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  toggleShowPassword() {
    this.isText = !this.isText;
    this.icon = this.isText ? 'fa-eye' : 'fa-eye-slash';
    this.type = this.isText ? 'text' : 'password';
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          this.authService.storeToken(res.token);
          const tokenPayload = this.authService.decodeToken();
          this.userStore.setUserName(tokenPayload.unique_name);
          this.userStore.setRole(tokenPayload.role);
          this.userStore.setEmail(tokenPayload.email);
          Toast.showToast(res.message, 'success');
          this.router.navigate(['dashboard']);
        },
        error: (err) => {
          Toast.showToast(err.error.message, 'error');
        },
      });
    } else {
      ValidateForms.validateForm(this.loginForm);
    }
  }
}
