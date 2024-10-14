import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar'; // Import ToolbarModule
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarModule, ButtonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],

})
export class SidebarComponent implements OnInit{
  @Input() isVisible: boolean = false;
  menuItems: any[] = [];
  userRole: string | null = null;
  constructor(private authService: AuthService, private router: Router) {
    console.log("side bar", this.isVisible)
  }
  ngOnInit(): void {
    // Get the user's role and adjust navigation menu accordingly
    this.userRole = this.authService.getUserRole();
    this.setMenuItems();
  }
  setMenuItems() {
    if (this.userRole === 'preparer') {
      this.menuItems = [
        { label: 'Dashboard', icon: 'pi pi-home', command: () => this.router.navigate(['/preparer']) },
        { label: 'Tasks', icon: 'pi pi-list',  },
        { label: 'Reports', icon: 'pi pi-chart-bar',  },
      ];
    } else if (this.userRole === 'reviewer') {
      this.menuItems = [
        { label: 'Dashboard', icon: 'pi pi-home', command: () => this.router.navigate(['/review']) },
        { label: 'Tasks', icon: 'pi pi-list',  },
        { label: 'Reports', icon: 'pi pi-chart-bar',  },
      ];
    } else {
      this.menuItems = [
        { label: 'Dashboard', icon: 'pi pi-home', command: () => this.router.navigate(['/review']) },
        { label: 'Tasks', icon: 'pi pi-list',  },
        { label: 'Reports', icon: 'pi pi-chart-bar',  },
      ];
    }
  }
}
