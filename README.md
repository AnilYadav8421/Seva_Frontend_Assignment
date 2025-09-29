# Seva Booking Application

I built this web application using **React.js** and **Redux** that allows users to browse, book, and pay for various sevas. It includes cart management, user verification with OTP, address validation using pincodes, and payment methods (Card & UPI).

---

## Features

* **Seva Listings** – Browse and select sevas to book.
        *---[Seva Listings – The documentation suggested fetching sevas from a backend API, but since it wasn’t ready, I created a mock object containing the seva data. I then used the fetch() method to simulate retrieving this data and display the sevas for users to browse and select.]
  
* **Cart Management** – Add, remove, and review selected sevas.
* **User Verification** – Secure OTP-based flow for existing and new users.
* **Address Validation** – Autofill city and state using pincode validation.  
       *---[Since no backend service was available for pincode lookup, I created a small mock Pincodes object in the frontend. When the user enters a valid 6-digit pincode, the app looks it up in this object and automatically fills in the corresponding city and state fields. If the pincode isn’t found, an error message is shown and the fields stay empty.]
* **Payment Modal** – Supports Card and UPI payment options.
* **State Management** – Powered by Redux for seamless user and cart data flow.
* **Navigation** – Smooth routing using `react-router`.

---

## Tech Stack

* **React.js** – Frontend UI framework
* **React Router** – Navigation and routing
* **Redux Toolkit** – State management
* **fetch() API** – Mock backend data fetching
* **CSS Modules** – Scoped component styling

---

## Project Structure

```
src/
├── components/        # Reusable UI components (FormInput, etc.)
├── pages/             # Main pages (Cart, Checkout, Payment, etc.)
├── store/             # Redux slices (cartSlice, userSlice)
├── App.js             # Root app with routing
└── main.js            # Entry point
```

---

## Demo

> [Demo](https://seva-frontend-assignment.vercel.app/)

---

