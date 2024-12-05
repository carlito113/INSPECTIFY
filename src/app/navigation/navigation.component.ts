import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
// import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  isOpen = false;
  dropdownOpen = false;

// Define the routes where the sidebar should remain open
routesThatKeepSidebarOpen: string[] = ['/weekly', '/revenue', '/','/expense','sales',''];

constructor(private router: Router) {}

ngOnInit(): void {
  // Check initial route and set sidebar state accordingly
  this.checkRoute(this.router.url);

  // Listen for route changes
  this.router.events.subscribe(() => {
    this.checkRoute(this.router.url);
  });
}

checkRoute(url: string): void {
  // If the route is in the list, keep the sidebar open
  if (this.routesThatKeepSidebarOpen.some(route => url.includes(route))) {
    this.isOpen = true;
  } else {
    this.isOpen = false;
  }
}


  toggleSidebar(): void {
    this.isOpen = !this.isOpen;

  }
  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;  // Toggle the dropdown
  }
}
