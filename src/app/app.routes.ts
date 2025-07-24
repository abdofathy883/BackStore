import { Routes } from '@angular/router';
import { AllProductsComponent } from './Pages/Products/all-products/all-products.component';
import { AllUsersComponent } from './Pages/Users/all-users/all-users.component';
import { AllCategoriesComponent } from './Pages/Category/all-categories/all-categories.component';
import { HomeComponent } from './Pages/home/home.component';
import { AllVendorsComponent } from './Pages/Vendos/all-vendors/all-vendors.component';
import { SingleProductComponent } from './Pages/Products/single-product/single-product.component';
import { SingleUserComponent } from './Pages/Users/single-user/single-user.component';
import { SingleCategoryComponent } from './Pages/Category/single-category/single-category.component';
import { SingleVendorComponent } from './Pages/Vendos/single-vendor/single-vendor.component';
import { AddNewOrderComponent } from './Retail/add-new-order/add-new-order.component';
import { MyProfileComponent } from './Pages/Users/my-profile/my-profile.component';
import { LogInComponent } from './Pages/log-in/log-in.component';
import { AllColorsComponent } from './Pages/Varients/all-colors/all-colors.component';
import { AllSizesComponent } from './Pages/Varients/all-sizes/all-sizes.component';
import { SingleSizeComponent } from './Pages/Varients/single-size/single-size.component';
import { single } from 'rxjs';
import { SingleColorComponent } from './Pages/Varients/single-color/single-color.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'product/all-products',
        component: AllProductsComponent
    },
    {
        path: 'user/all-users',
        component: AllUsersComponent
    },
    {
        path: 'user/my-profile',
        component: MyProfileComponent
    },
    {
        path: 'user/single-user',
        component: SingleUserComponent
    },
    {
        path: 'login',
        component: LogInComponent
    },
    {
        path: 'category/all-categories',
        component: AllCategoriesComponent
    },
    {
        path: 'vendor/all-vendors',
        component: AllVendorsComponent
    },
    {
        path: 'single-product',
        component: SingleProductComponent
    },
    {
        path: 'single-user',
        component: SingleUserComponent
    },
    {
        path: 'single-category',
        component: SingleCategoryComponent
    },
    {
        path: 'single-vendor',
        component: SingleVendorComponent
    },
    {
        path: 'order/add-new-order',
        component: AddNewOrderComponent
    },
    {
        path: 'varient/all-colors',
        component: AllColorsComponent
    },
    {
        path: 'varient/all-sizes',
        component: AllSizesComponent
    },
    {
        path: 'sizes/single-size : id',
        component: SingleSizeComponent
    },
    {
        path: 'colors/single-color : id',
        component: SingleColorComponent
    }
];
