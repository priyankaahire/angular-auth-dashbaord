import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { PrimeNgModule } from './shared/prime-ng.module'; 
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations'; // Animations support

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),  provideAnimations(), ]
};
