const inputs = document.querySelectorAll(".input-field");
const toggle_btn = document.querySelectorAll(".toggle");
const main = document.querySelector("main");
const bullets = document.querySelectorAll(".bullets span");
const images = document.querySelectorAll(".image");
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getDatabase, ref, set, update } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js"
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js"



inputs.forEach((inp) => {
  inp.addEventListener("focus", () => {
    inp.classList.add("active");
  });
  inp.addEventListener("blur", () => {
    if (inp.value != "") return;
    inp.classList.remove("active");
  });
});

toggle_btn.forEach((btn) => {
  btn.addEventListener("click", () => {
    main.classList.toggle("sign-up-mode");
  });
});

// this function moves the sign in tab to the sign up tab onclick
function moveSlider() {
  let index = this.dataset.value;

  let currentImage = document.querySelector(`.img-${index}`);
  images.forEach((img) => img.classList.remove("show"));
  currentImage.classList.add("show");

  const textSlider = document.querySelector(".text-group");
  textSlider.style.transform = `translateY(${-(index - 1) * 2.2}rem)`;

  bullets.forEach((bull) => bull.classList.remove("active"));
  this.classList.add("active");
}


bullets.forEach((bullet) => {
  bullet.addEventListener("click", moveSlider);
});




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
  


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

const signupEmailPassword = async () => {  
  
  const signupEmail = document.getElementById('signupEmail').value.toLowerCase().trim(); // Convert email input into lowercase
  const signupPassword = document.getElementById('signupPassword').value.trim();
  const signupName = document.getElementById('name').value.trim();


  if (signupName.length == 0 || signupEmail.length == 0 || signupPassword.length == 0) { //Check if any blanks
    showSignUpError('blank')
  } else if (signupPassword.length <6) { // Check if password less than 6 characters
    showSignUpError('short')
  } else if (!document.querySelector("[name='agree']").checked) { //Check if Terms of services agreed to
    showSignUpError('checkbox')
  } else {
    showSignUpError('none') // No error
    try {

      const userCredential = await createUserWithEmailAndPassword(auth, signupEmail, signupPassword) //Create account in firebase authentication 
      const db = getDatabase();
      const user = userCredential.user
      const reference = ref(db, 'users/' + user.uid)
      const testRef = ref(db,'testCompletion/' + user.uid)
      user.displayName = signupName  
      // console.log(user)
      set(reference, { //Update realtime database with user info
        username: signupName,
        email:signupEmail,
        image:'avatar1.jpg' //default avatar
        })
      update(testRef, {totalScore:0}) //default score = 0

      document.getElementById('signinMessage').innerText="You have successfully signed up!" 
      document.getElementById('signinMessage').setAttribute("style","color:green")
      clearFields()
      main.classList.toggle("sign-up-mode") //Move screen back to login



    }
    catch(error) {
      // console.log(error);
      showSignUpError(error.code); //Show error code
    }
  }}

  const loginEmailPassword = async () => { //Login user
    const loginEmail = document.getElementById('loginEmail').value.trim();
    const loginPassword = document.getElementById('loginPassword').value.trim();
    if (loginEmail == '' || loginPassword == '') { //Check for blank input
      showLogInError('blank'); 
    } else {
      // console.log(loginEmail,loginPassword)
      try {
      const loginCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      window.location.href = "../Home/home.html" //Redirect to homepage
      }
      catch(error) { // Username/password wrong
        // console.log(error);
        showLogInError('invalid')
      }
    }
  }


function showSignUpError(error) { //Error code function for signup
      // console.log(error)
      var msgSpace = document.getElementById('signupError')
      if (error == 'auth/email-already-in-use'){
        msgSpace.innerText= 'Email already exists!'
      } else if (error == 'short') {
        msgSpace.innerText= 'Password has to be more than 6 characters!'
      } else if (error == 'blank') {
        msgSpace.innerText = 'Please fill in the blanks!'
      } else if (error == 'checkbox') {
        msgSpace.innerText = 'Please agree to our terms and services!'
      } else if (error == 'none') {
        msgSpace.innerText = ''
      }
        
}

function showLogInError(error) { //Error code function for signin
  var loginMsg = document.getElementById('signinMessage')
  loginMsg.setAttribute('style','color:red')
  if (error == 'blank') {
    loginMsg.innerText = 'Please fill in the blanks!'
  } else if (error == 'invalid') {
    loginMsg.innerText = 'Wrong email or password!'
  }
}

function clearFields() { //Clear login and sign up fields
  let fields = document.getElementsByClassName('input-field')
  for (let field of fields) {
    // console.log(field)
    field.value = ''
  }
  document.querySelector("[name='agree']").checked = false;
}


  
document.getElementById('signup').addEventListener('click',signupEmailPassword);

document.getElementById('login').addEventListener('click',loginEmailPassword);

//Prevent button from automatically redirecting
document.getElementById("signup").addEventListener("click", function(event){
  event.preventDefault()
});

document.getElementById("login").addEventListener("click", function(event){
  event.preventDefault()
});