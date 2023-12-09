# Dwelling Real Estate Platform

Welcome to Dwelling, your ultimate destination for a comprehensive and dynamic real estate experience! Our full-stack platform is tailored to streamline property buying and selling, offering a range of features to enhance user interaction and satisfaction.

## Features

### Mobile Responsiveness

Dwelling is designed to provide a seamless experience across all devices. Whether you're using a desktop, tablet, or smartphone, our platform adapts to ensure optimal functionality and user experience.

### Contact Forms

Communicate effortlessly with property owners, potential buyers, or our support team through our user-friendly contact forms. Streamline communication and make inquiries with ease.

### Firebase Authentication

Your security is our priority. Dwelling implements Firebase authentication to ensure a secure and reliable user registration and login process. Rest assured that your personal information is protected.

### Email Notifications

Stay informed with real-time updates through email notifications. Receive alerts about property transactions, inquiries, and important platform announcements, keeping you in the loop at all times.

### Testimonials

Discover the experiences of others through testimonials. Gain insights into successful property transactions and build trust within the Dwelling community.

### Property Search with Filter

Effortlessly find your dream property using our advanced search functionality. Filter options allow you to refine your search, ensuring that you discover the properties that match your specific criteria.

### Property Listing

Whether you're a property owner or a real estate agent, easily list properties on Dwelling. Our platform provides a user-friendly interface for efficient property management, allowing you to showcase your listings attractively.

### Intuitive Admin Panel

For property management, Dwelling provides an intuitive admin panel. This powerful tool allows efficient property listing, deletion, and overall management. The admin panel is designed with features such as mobile responsiveness, contact forms, Firebase authentication, email notifications, testimonials, and advanced property search with filters.


## Project Setup Tutorial

### Prerequisites

1. Node.js and npm installed on your machine. You can download them from [here](https://nodejs.org/).
2. Create a Firebase project on the [Firebase Console](https://console.firebase.google.com/).

### Step 1: Create React App

```bash
npx create-react-app dwelling-real-estate
cd dwelling-real-estate

```

### Step 2: Install Tailwind CSS

```bash
# Install tailwindcss and its dependencies
npm install tailwindcss postcss autoprefixer

# Create a configuration file for tailwind
npx tailwindcss init -p

```

In the tailwind.config.js file, make sure to configure it appropriately for your project.

### Step 3: Configure PostCSS

Create a postcss.config.js file in the project root and add the following content:

```javascript
module.exports = {
  plugins: [require("tailwindcss"), require("autoprefixer")],
};
```

### Step 4: Set Up Firebase

1.  Install Firebase tools:

```bash
npm install -g firebase-tools
```

2. Login to Firebase:

```bash
firebase login
```

3.  Initialize Firebase in your project::

```bash
firebase init
```

During initialization, choose Firebase features relevant to your project, such as Authentication and Firestore.

### Step 5 : Connect Firebase Config

In your src folder, create a firebase.js file:

```javascript
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  // Your Firebase config here
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;
```

Replace the placeholder with your actual Firebase configuration.

### Step 6 : Connect Firebase Config

```bash
npm start
```
Visit http://localhost:3000 to see your Dwelling Real Estate Platform in action!


## Getting Started

1. **Client-Side Login**:

   - [Client Login](https://dwelling.vercel.app) - Usertest@gmail.com / pass: test@12345

2. **Admin-Side Login**:

   - [Admin Login](https://dwelling-admin.vercel.app) - Admintest@gmail.com / pass: admin@12345

3. **Explore Properties**: Utilize our advanced search and filter options to discover the perfect property.
4. **Contact and Communicate**: Use contact forms to inquire about properties or engage with other users.
5. **Stay Informed**: Receive email notifications to stay updated on transactions, inquiries, and more.
6. **Admin Panel Access**: If you're a property manager or administrator, access the intuitive admin panel to efficiently manage listings and user interactions.


## Contact Us
For any questions, assistance, or feedback, please contact at rajakumarmahto952@gmail.com