import { Routes } from '@angular/router';
import { AllProductsComponent } from './features/products/components/all-products/all-products.component';
import { AllVendorsComponent } from './Pages/Vendos/all-vendors/all-vendors.component';
import { SingleProductComponent } from './features/products/components/single-product/single-product.component';
import { SingleVendorComponent } from './Pages/Vendos/single-vendor/single-vendor.component';
import { AddNewOrderComponent } from './Pages/Retail/add-new-order/add-new-order.component';
import { LogInComponent } from './features/auth/components/log-in/log-in.component';
import { loginGuard } from './Core/Guards/login.guard';
import { noLoginGuard } from './Core/Guards/no-login.guard';
import { rolesGuard } from './Core/Guards/roles.guard';
import { AllUsersComponent } from './features/auth/components/all-users/all-users.component';
import { MyProfileComponent } from './features/auth/components/my-profile/my-profile.component';
import { SingleUserComponent } from './features/auth/components/single-user/single-user.component';
import { AllCategoriesComponent } from './features/category/components/all-categories/all-categories.component';
import { AddCategoryComponent } from './features/category/components/add-category/add-category.component';
import { SingleCategoryComponent } from './features/category/components/single-category/single-category.component';
import { AddUserComponent } from './features/auth/components/add-user/add-user.component';
import { AddProductComponent } from './features/products/components/add-product/add-product.component';
import { AllColorsComponent } from './features/variants/components/all-colors/all-colors.component';
import { AllSizesComponent } from './features/variants/components/all-sizes/all-sizes.component';
import { SingleSizeComponent } from './features/variants/components/single-size/single-size.component';
import { SingleColorComponent } from './features/variants/components/single-color/single-color.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LogInComponent,
        title: 'تسجيل الدخول',
        canActivate: [noLoginGuard]
    },
    {
        path: 'users/all',
        component: AllUsersComponent,
        title: 'جميع المستخدمين',
        canActivate: [loginGuard]
    },
    {
        path: 'users/add',
        component: AddUserComponent,
        canActivate: [loginGuard]
    },
    {
        path: 'users/:id',
        component: SingleUserComponent,
        canActivate: [loginGuard]
    },
    {
        path: 'my-profile/:id',
        component: MyProfileComponent,
        title: 'حسابي',
        canActivate: [loginGuard]
    },
    {
        path: 'categories/all',
        component: AllCategoriesComponent,
        title: 'جميع التصنيفات',
        canActivate: [loginGuard, rolesGuard],
        // data: {roles: ['SuperAdmin']}
    },
    {
        path: 'categories/add',
        component: AddCategoryComponent,
        canActivate: [rolesGuard],
        // data: {roles: ['SuperAdmin']}
    },
    {
        path: 'categories/:id',
        component: SingleCategoryComponent,
        canActivate: [loginGuard]
    },
    {
        path: 'products/all',
        component: AllProductsComponent,
        title: 'جميع المنتجات',
        canActivate: [loginGuard]
    },
    {
        path: 'products/add',
        component: AddProductComponent,
        canActivate: [loginGuard]
    },
    {
        path: 'products/:id',
        component: SingleProductComponent,
        canActivate: [loginGuard]
    },
    {
        path: 'colors/all',
        component: AllColorsComponent,
        title: 'جميع الالوان',
        canActivate: [loginGuard]
    },
    {
        path: 'sizes/all',
        component: AllSizesComponent,
        title: 'جميع المقاسات',
        canActivate: [loginGuard]
    },
    {
        path: 'vendor/all-vendors',
        component: AllVendorsComponent,
        canActivate: [loginGuard]
    },
    {
        path: 'single-vendor',
        component: SingleVendorComponent,
        canActivate: [loginGuard]
    },
    {
        path: 'order/add-new-order',
        component: AddNewOrderComponent,
        canActivate: [loginGuard]
    },
    
    {
        path: 'sizes/single-size/:id',
        component: SingleSizeComponent,
        canActivate: [loginGuard]
    },
    {
        path: 'colors/single-color/:id',
        component: SingleColorComponent,
        canActivate: [loginGuard]
    }
];
