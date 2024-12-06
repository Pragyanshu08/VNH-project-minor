let menu = document.querySelector('.menu');
let close = document.querySelector('.close');
let smallNav = document.querySelector('.smallnav');

menu.addEventListener('click', ()=>{
    smallNav.classList.remove('hidden');
    close.classList.remove('hidden');
    menu.classList.add('hidden');

})

close.addEventListener('click',()=>{
    smallNav.classList.add('hidden');
    close.classList.add('hidden');
    menu.classList.remove('hidden');
})


let login=document.querySelector('.login');
let cancelBtn=document.querySelector('.cancel');
let popup=document.querySelector('.popup');
let login_to_signup = document.querySelector('.login_to_signup');

login.addEventListener('click' , ()=>{
    popup.classList.remove('hidden');
    login.classList.add('hidden')
    signup.classList.add('hidden');
})

cancelBtn.addEventListener('click' , ()=>{
    popup.classList.add('hidden');
    login.classList.remove('hidden')
    signup.classList.remove('hidden');
})

login_to_signup.addEventListener('click',()=>{
    popup_sigup.classList.remove('hidden');
    popup.classList.add('hidden');
})

let popup_sigup=document.querySelector('.popup_sigup');
let signup=document.querySelector('.signup');
let cancelBtnb=document.querySelector('.cancel2');
let signup_to_login =document.querySelector('.signup_to_login');

signup.addEventListener('click' , ()=>{
    popup_sigup.classList.remove('hidden');
    login.classList.add('hidden');
    signup.classList.add('hidden');
})

cancelBtnb.addEventListener('click' , ()=>{
    popup_sigup.classList.add('hidden');
    login.classList.remove('hidden')
    signup.classList.remove('hidden');
})

signup_to_login.addEventListener('click',()=>{
    popup.classList.remove('hidden');
    popup_sigup.classList.add('hidden');
})

let bgvdo=document.querySelector('.background-video');
bgvdo.playbackRate=0.8;






// IN LOGIN PAGE

const postBtn = document.querySelector('#create-post-btn');

postBtn.addEventListener('click' , ()=>{
    alert('heello')
})


