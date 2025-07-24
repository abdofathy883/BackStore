import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./Components/header/header.component";
import { Subscription } from 'rxjs';
import { PopUpService } from './Services/PopUp/pop-up.service';
import { AddProductComponent } from "./Pages/Products/add-product/add-product.component";
import { AddCategoryComponent } from "./Pages/Category/add-category/add-category.component";
import { AddUserComponent } from "./Pages/Users/add-user/add-user.component";
import { AddVendorComponent } from "./Pages/Vendos/add-vendor/add-vendor.component";
import { AddColorComponent } from "./Pages/Varients/add-color/add-color.component";
import { AddSizeComponent } from "./Pages/Varients/add-size/add-size.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, AddProductComponent, AddCategoryComponent, AddUserComponent, AddVendorComponent, AddColorComponent, AddSizeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'BackStore-Client';

  popupStates: { [key: string]: boolean } = {};
  subscription: Subscription;

  isSidebarCollapsed = false;
  isMobile = false;

  constructor(private popup: PopUpService) {
    this.subscription = this.popup.popupStates$.subscribe(states => {
      this.popupStates = states;
    });
  }
  ngOnInit(): void {
    this.checkScreen();
    window.addEventListener('resize', this.checkScreen.bind(this));
  }

  closePopup(id: string) {
  this.popup.closePopup(id);
}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    window.removeEventListener('resize', this.checkScreen.bind(this));
  }

  get sidebarIsOpenOnMobile() {
    return this.isMobile && !this.isSidebarCollapsed;
  }

  closeSidebar() {
    if (this.isMobile) {
      this.isSidebarCollapsed = true;
    }
  }

  checkScreen() {
    this.isMobile = window.innerWidth <= 768;
    if (this.isMobile) {
      this.isSidebarCollapsed = true;
    }
  }

   toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}
