// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: "AIzaSyC5zv8b1wfc8sofw0ykmpULeFI6tJa6Grk",
authDomain: "user-auth-78123.firebaseapp.com",
projectId: "user-auth-78123",
storageBucket: "user-auth-78123.appspot.com",
messagingSenderId: "482788407967",
appId: "1:482788407967:web:89e3ecdc24f3dc076c00aa",
measurementId: "G-VK5DKQCCJ2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export function redirect_to(url){
    location.replace(url);
}