import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService} from "./auth/auth.service";

export const canActivateAuth = (): boolean => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticatedUser()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
