import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const expectedRole = 'Admin';

  if (authService.getUserRole() !== expectedRole) {
    window.alert('Access denied!');
    router.navigate(['home']);
    return false;
  }
  return true;
};
