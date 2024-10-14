import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { SidebarModule } from 'primeng/sidebar';

import { MenubarModule } from 'primeng/menubar';
import { ToolbarModule } from 'primeng/toolbar'; // Import ToolbarModule
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    TableModule,
    InputTextModule,
    DropdownModule,
    ToastModule,
    SidebarModule,
    MenubarModule,
    ToolbarModule,
    
    // Add other PrimeNG modules as needed
  ],
  exports: [
    ButtonModule,
    CardModule,
    TableModule,
    InputTextModule,
    DropdownModule,
    ToastModule,
    SidebarModule,
    MenubarModule,
    ToolbarModule
    // Export the modules so they can be used in other modules
  ]
})
export class PrimeNgModule { }
