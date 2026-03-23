import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';

export const rolesGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const allowedRoles = route.data['roles'] as string[];
  // const user = auth.getCurrentUser();

  // const isAuthorized = user?.roles.some(role => allowedRoles.includes(role));

  // if (!isAuthorized) {
  //   router.navigate(['/not-found']);
  //   return false;
  // }

  return true;
};
