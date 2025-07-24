import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../Services/Auth/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  @Input() signalIsCollapsed: boolean = false;
  @Input() signalIsMobile: boolean = false;
  @Output() signalToggleSidebar = new EventEmitter<void>();
  isCollapsed = false;
  isMobile = false;
  isAdmin: boolean = false;
  isSuperAdmin: boolean = false;
  isCashier: boolean = false;
  isManager: boolean = false;

  constructor(private authService: AuthService) {}

  @HostListener('window:resize')
  
  onResize() {
    this.checkScreen();
  }

  checkScreen() {
    this.isMobile = window.innerWidth <= 768;
    if (this.isMobile) {
      this.isCollapsed = true;
    }
  }

  ngOnInit(): void {
    this.checkScreen();
    this.isAdmin = this.authService.isAdmin();
    this.isSuperAdmin = this.authService.isSuperAdmin();
    this.isCashier = this.authService.isCashier();
    this.isManager = this.authService.isManager();
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}

