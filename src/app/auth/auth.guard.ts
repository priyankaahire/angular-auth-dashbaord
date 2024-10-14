import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);  // Inject the AuthService
  const router = inject(Router);  // Inject the Router
console.log("in cuth guard")
  if (!authService.isAuthenticated()) {
    // If not authenticated, redirect to login
    router.navigate(['/review']);
    return false;
  }

  // Role-based access control
  const userRole = authService.getUserRole();
  const allowedRoles = route.data['roles'] as Array<string>;  // Get allowed roles from route

  if (allowedRoles && !allowedRoles.includes(userRole!)) {
    // If user role is not allowed, redirect to another page (e.g., home)
    router.navigate(['/review']);
    return false;
  }

  // Allow access if authenticated and role is allowed
  return true;

  
};