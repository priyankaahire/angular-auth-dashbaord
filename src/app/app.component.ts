import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, HeaderComponent, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {
  title = 'angular-micro-dashboard';
  isSidebarVisible: boolean = false;

  toggleSidebar() {
    console.log("inside side bar", this.isSidebarVisible)
    this.isSidebarVisible = !this.isSidebarVisible;
  }
}
