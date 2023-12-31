import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import {getAuth, signOut} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js"


const firebaseConfig = {
    apiKey: "AIzaSyCEjW5Rq4jgHbSS1GCJy0pl6hpPrFQ9pUI",
    authDomain: "wad2-4fc9e.firebaseapp.com",
    projectId: "wad2-4fc9e",
    storageBucket: "wad2-4fc9e.appspot.com",
    messagingSenderId: "83590678050",
    appId: "1:83590678050:web:6c98cdb011612eb4f5ac7b",
    measurementId: "G-NY0ZMNMQLZ",
    databaseURL: "https://wad2-4fc9e-default-rtdb.asia-southeast1.firebasedatabase.app"
    };
  
//Initialise firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

const logout = async() => { //Logout user
    console.log('test')
    signOut(auth).then(
        window.location.href = '../Login/index.html' //Redirect to login page
    )
}

document.getElementById('logout').addEventListener('click',logout);