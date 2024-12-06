const postBtn = document.querySelector('#create-post-btn');
const popup = document.querySelector('.popup');
const cancel =document.querySelector('.cancel');


postBtn.addEventListener('click' , ()=>{
    popup.classList.remove('hidden');
})

cancel.addEventListener('click' , ()=>{
    popup.classList.add('hidden');
})