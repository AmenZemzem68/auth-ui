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
import Swal from 'sweetalert2';
import Toast from '../../helpers/toast';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  isTextPassword: boolean = false;
  isTextConfirmPassword: boolean = false;
  iconPassword: string = 'fa-eye-slash';
  iconConfirmPassword: string = 'fa-eye-slash';
  typePassword: string = 'password';
  typeConfirmPassword: string = 'password';
  signupForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
  }

  toggleShowPassword() {
    this.isTextPassword = !this.isTextPassword;
    this.iconPassword = this.isTextPassword ? 'fa-eye' : 'fa-eye-slash';
    this.typePassword = this.isTextPassword ? 'text' : 'password';
  }

  toggleShowConfirmPassword() {
    this.isTextConfirmPassword = !this.isTextConfirmPassword;
    this.iconConfirmPassword = this.isTextConfirmPassword
      ? 'fa-eye'
      : 'fa-eye-slash';
    this.typeConfirmPassword = this.isTextConfirmPassword ? 'text' : 'password';
  }

  onSignUp() {
    if (this.signupForm.valid) {
      const { confirmPassword, ...signUpData } = this.signupForm.value;
      this.authService.signUp(signUpData).subscribe({
        next: (res) => {
          this.signupForm.reset();
          Toast.showToast(res.message, 'success');
          this.router.navigate(['login']);
        },
        error: (err) => {
          Toast.showToast(err.error.message, 'error');
        },
      });
    } else {
      ValidateForms.validateForm(this.signupForm);
    }
  }
}
