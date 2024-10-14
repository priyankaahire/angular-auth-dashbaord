import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userRole: string | null = null;

  constructor() { 
    this.userRole = 'reviewer';
  }

  login(role: string) {
    // Simulate a login by setting the role
    this.userRole = 'reviewer';
  }

  getUserRole(): string | null {
    return this.userRole;
  }

  isAuthenticated(): boolean {
    return !!this.userRole; // User is authenticated if a role is set
  }
 
}
