// Firebase Configuration (Replace with your actual config)
const firebaseConfig = {
  apiKey: "AIzaSyBC1HjR6nvdVZDEXWi7tZaADo0qC2juI0Q",
  authDomain: "tiwari-travels-64134.firebaseapp.com",
  projectId: "tiwari-travels-64134",
  storageBucket: "tiwari-travels-64134.firebasestorage.app",
  messagingSenderId: "776795933650",
  appId: "1:776795933650:web:65bce6c89326847e80560b",
  measurementId: "G-EC0JZKXX8G"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Google Auth Provider
const googleProvider = new firebase.auth.GoogleAuthProvider();

// DOM Elements
const loginForm = document.getElementById('login-form');
const googleBtn = document.getElementById('google-login');
const toggleSignup = document.getElementById('toggle-signup');
const authTitle = document.querySelector('.auth-title');
const authSubtitle = document.querySelector('.auth-subtitle');
const submitBtn = loginForm.querySelector('button');

let isLogin = true;

// Toggle Login/Signup
toggleSignup.addEventListener('click', (e) => {
  e.preventDefault();
  isLogin = !isLogin;
  
  if (isLogin) {
    authTitle.textContent = 'Welcome Back';
    authSubtitle.textContent = 'Login to manage your bookings and exclusive offers';
    submitBtn.textContent = 'Login';
    toggleSignup.innerHTML = 'Sign up';
    document.querySelector('.auth-footer').firstChild.textContent = "Don't have an account? ";
    document.getElementById('forgot-password').parentElement.style.display = 'block';
  } else {
    authTitle.textContent = 'Create Account';
    authSubtitle.textContent = 'Join us for a premium travel experience';
    submitBtn.textContent = 'Sign Up';
    toggleSignup.innerHTML = 'Login';
    document.querySelector('.auth-footer').firstChild.textContent = "Already have an account? ";
    document.getElementById('forgot-password').parentElement.style.display = 'none';
  }
});

// Forgot Password Logic
document.getElementById('forgot-password').addEventListener('click', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  if (!email) {
    alert('Please enter your email address first.');
    return;
  }
  auth.sendPasswordResetEmail(email)
    .then(() => {
      alert('Password reset email sent! Check your inbox.');
    })
    .catch((error) => {
      alert(error.message);
    });
});

// Email/Password Auth
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (isLogin) {
    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        window.location.href = 'index.html';
      })
      .catch((error) => {
        alert(error.message);
      });
  } else {
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        window.location.href = 'index.html';
      })
      .catch((error) => {
        alert(error.message);
      });
  }
});

// Google Login
googleBtn.addEventListener('click', () => {
  auth.signInWithPopup(googleProvider)
    .then((result) => {
      window.location.href = 'index.html';
    })
    .catch((error) => {
      alert(error.message);
    });
});

// Check Auth State
auth.onAuthStateChanged((user) => {
  if (user && window.location.pathname.includes('login.html')) {
    window.location.href = 'index.html';
  }
});
