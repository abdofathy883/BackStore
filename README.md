# BackStore – Admin Dashboard & POS Frontend

BackStore is an Angular application designed for managing inventory, vendors, and cashier transactions in a unified admin and POS system. It connects to the [Retail backend](https://github.com/abdofathy883/Retail) and supports both administrative workflows and point-of-sale operations.

---

## 🧠 Project Overview

BackStore provides two core roles:
- **Admin**: Manage products, categories, vendors, and orders
- **Cashier**: Place new orders via the POS module during live customer transactions

This is a separate interface from the customer-facing [StoreFront](https://github.com/abdofathy883/StoreFront).

---

## 🚀 Key Features

- **Secure Authentication**: JWT-based login with role-specific routing
- **Inventory Management**: CRUD UI for categories, products, variants, and vendors
- **POS Module**: Simple interface for cashiers to place real-time orders (keyboard/mouse input; hardware support not yet implemented)
- **Order Management**: View placed orders, statuses, and summary details
- **Role Guards**: Enforced route protection based on JWT role claims
- **Interceptor Integration**: All API calls secured via Angular HTTP interceptors
- **Responsive Design**: Layouts optimized for desktop use with expandable navigation

---

## 🧱 Architecture & Project Structure

BackStore uses a modular Angular architecture with services and guards:

### 📂 Key Modules

- `AuthModule`: Login, JWT handling, and redirection logic
- `AdminModule`: Product/category/vendor/order management views
- `POSModule`: POS interface for order entry and confirmation
- `SharedModule`: Reusable components, pipes, layouts, and guards

### 🛠️ Core Services

- `AuthService`: Login, logout, and token storage
- `ApiService`: Generic wrapper for calling the backend API
- `InterceptorService`: Attaches JWT to outbound HTTP requests
- `GuardService`: Protects admin/POS routes by role

---

## 🔧 Technology Stack

| Category       | Tech                          |
|----------------|-------------------------------|
| Framework      | Angular 19                    |
| Language       | TypeScript                    |
| Styling        | Bootstrap                     |
| Routing        | Angular Router (lazy-loaded)  |
| Security       | JWT Auth + Route Guards       |
| API Handling   | HttpClient + Interceptors     |

---

## 🔐 Roles & Permissions

| Role          | Permissions                                   |
|---------------|-----------------------------------------------|
| SuperAdmin    | Full access to all operations, non-deletable  |
| Admin         | Partial access to all operations              |
| Manager       | Manages POS module & Cachiers                 |
| Cachier       | POS module: create orders                     |

---

## 📄 License

This project is developed for prototyping purposes. Contact the maintainer for commercial use or extensions.
