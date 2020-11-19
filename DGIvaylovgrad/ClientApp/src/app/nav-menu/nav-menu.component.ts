import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../_services';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})

export class NavMenuComponent {
  collapsed = true;
  isLoggedIn;

  constructor(
    private accountService: AccountService) { this.isLoggedIn = localStorage.getItem("user"); }

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  LogOut() {
    this.accountService.logout();
    this.isLoggedIn = "";


  }

  
}
