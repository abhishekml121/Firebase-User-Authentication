import { getAuth,signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";

const auth = getAuth();

const welcome = document.querySelector('.welcome');

// track for user is login or not.
const tracking = async () => {
  await auth.onAuthStateChanged((user)=>{
    if(user){
        welcome.style.display='flex';
        document.querySelector('.form_sectoion').style.display='none';
        const show_name = document.querySelector('.username');
        show_name.textContent = user.displayName;
    }else{
        welcome.style.display='none';
        document.querySelector('.form_sectoion').style.display='block';

    }
  })
}
// run at very first step, if user is already loged in then don't 
// show forms. Just show welcome page.
tracking();


// login new or old users.
const loginUser = ()=>{
  let email = document.querySelector('#login .email').value;
  let password = document.querySelector('#login .password').value;

  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    tracking();
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    document.querySelector('.error.login_error').innerHTML=errorMessage;
  });
}

// register new user and store data in firebase.
// name, email and password.
const createNewUser = async () => {

  let userName = document.getElementById('name').value;
  let email = document.querySelector('#reg .email').value;
  let password = document.querySelector('#reg .password').value;

  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(user, { displayName: userName });
  tracking();
}



const reg_form = document.getElementById('reg');
const login_form = document.getElementById('login');

// validation data on submit the form.
reg_form.addEventListener('submit', (e)=>{
  e.preventDefault();
  createNewUser()
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      document.querySelector('.error.reg_error').innerHTML=errorMessage;
      // ..
    });
})

login_form.addEventListener('submit', (e)=>{
  e.preventDefault();
  loginUser();
})


// TOGGLE FORM FOR LOGIN AND SIGN UP with animation.
let reg_form_wrap = document.querySelector('.reg_form_div');
let login_form_wrap = document.querySelector('.login_form_div');
let show_login = document.querySelector('.aleardy_member');
let show_reg = document.querySelector('.reg_show');
show_login.addEventListener('click', ()=>{
  reg_form_wrap.classList.add('hide_reg_anim');
  setTimeout(()=>{
    reg_form_wrap.style.display='none';
    login_form_wrap.classList.add('show_login_anim');
    setTimeout(()=>{
      login_form_wrap.classList.remove('hide_login_anim');
    }, 10);
    login_form_wrap.style.display="flex";
  }, 400);
});


show_reg.addEventListener('click', ()=>{
  login_form_wrap.classList.add('hide_login_anim');
  setTimeout(()=>{
    login_form_wrap.style.display='none';
    setTimeout(()=>{
      reg_form_wrap.classList.remove('hide_reg_anim');
    }, 10);
    reg_form_wrap.classList.add('show_login_anim');
    reg_form_wrap.style.display="flex";
  }, 400);
});


// FORGET PASSWORD
const forget_paswd = document.querySelector('.forget_paswd');
forget_paswd.addEventListener('click',()=>{
  let email = document.querySelector('#login .email').value;
  sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      alert('An email has sent to ' + email + ' with the password reset link.');
    })
    .catch((error) => {
      const errorMessage = error.message;
      document.querySelector('.error.login_error').innerHTML=errorMessage;
    });
});



// loout user
const logout_btn = document.querySelector('.logout');
logout_btn.addEventListener('click', ()=>{
  signOut(auth).then(() => {
    // Sign-out successful.
    welcome.style.display='none';
    document.querySelector('.form_sectoion').style.display='block';
  }).catch((error) => {
    document.querySelector('.error').innerHTML=error;
  });
});



// THANK YOU !!!!!!!!!!!!