![reviewsDone](https://github.com/user-attachments/assets/0428edc4-f1d2-45d0-b591-9a63932aec37)
![review](https://github.com/user-attachments/assets/fb7a0449-b39b-42fe-8f3f-f7b49360b3ac)
![registerImage](https://github.com/user-attachments/assets/0c6f05b4-ab99-404c-83d5-b8d6fc16fb4a)
![Home](https://github.com/user-attachments/assets/ddc88cad-47a6-4144-933d-a23cc09aa16b)
![cart](https://github.com/user-attachments/assets/3972bbc3-d746-47a7-832a-32b5ede980bd)
Product Card Review System - 

This project is a React application that displays products with an interactive review system. Users can view product details, add items to their cart, and leave a rating and comment for each product. The review data is stored in Firebase Firestore, with real-time updates that display the latest reviews.

Features -

1- Product Display: Displays product details such as image, title, and price.
2- Add to Cart: Adds items to a cart with a success notification.
3- Review System: Allows users to leave a rating (out of 5 stars) and a comment. The latest two 4- reviews are displayed, and users can submit only one review per product.
5- Responsive and Interactive UI: Styled with CSS and designed for a smooth user experience.
6- Lazy Loading with Suspense: Components are lazily loaded, showing a loading spinner during     loading time.


Design Choices:

1- Firebase Firestore: Firestore is used for storing reviews as it provides real-time updates, scalability, and easy integration with Firebase Authentication.
2- Modular and Reusable Components: The app is organized with modular components, making it easy to expand or reuse functionality.
3- React Suspense for Lazy Loading: The Suspense component is used to lazy load parts of the app, enhancing performance by loading only the necessary parts of the app initially.
4- Star Ratings: The review system includes interactive star ratings, improving the UX with visual cues for rating selection.
5- Conditional Review Form: The review form appears as a popup when a user clicks "Write a Review" and disappears when a review is submitted or the close button is clicked.


Getting Started- 

Prerequisites
Node.js (version 14 or above)
Firebase Account: A Firebase project with Firestore enabled.
Installation
Clone the Repository


git clone https://github.com/your-username/product-card-review.git
cd product-card-review
Install Dependencies


npm install
Configure Firebase

Set up a Firebase project on Firebase Console.
Enable Firestore and set up Authentication (optional).
Add your Firebase configuration details in a new file: src/firebase/firebaseConfig.js.
 
// firebaseConfig.js
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export default app;
Running the Application
Start the Development Server

npm start

Access the Application

Open your browser and navigate to http://localhost:3000 to view the application.

Usage :

Add to Cart: Click on the "Add to Cart" button to add the product to the cart. A success message appears upon successful addition.
Write a Review: Click "Write a Review" to open the review form. Select a star rating and write your comment, then click "Submit Review."
View Reviews: The latest two reviews for each product are displayed under the product details.

Technologies Used :

1- React: Frontend framework.
2- Firebase Firestore: Database for storing reviews.
3- React-Toastify: For displaying notifications.
4- React Icons: Used for the star rating icons and close icon.
5- CSS: Custom styling for responsive layout and smooth transitions.


License
This project is open-source under the MIT License.
