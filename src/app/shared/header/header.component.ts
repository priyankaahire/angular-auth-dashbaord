import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { ToolbarModule } from 'primeng/toolbar'; // Import ToolbarModule
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule, ToolbarModule,  MenubarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HeaderComponent {
  title = 'angular-micro-dashboard';
  @Output() menuToggle = new EventEmitter();
  constructor(private authService: AuthService, private router: Router) {
    console.log("inside header")
  }
 
 // isSidebarVisible: boolean = false;

  toggleSidebar() {
   // this.isSidebarVisible = !this.isSidebarVisible;
    this.menuToggle.emit()
  }
}
