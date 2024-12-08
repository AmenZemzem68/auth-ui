import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import Toast from '../helpers/toast';
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isLoggedIn()) {
    return true;
  }
  Toast.showToast('You need to log in to access this page!', 'warning');
  router.navigate(['login']);
  return false;
};
