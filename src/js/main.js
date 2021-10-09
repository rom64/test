window.addEventListener('DOMContentLoaded', function(){
    /*popup*/
    const modalOpen = document.querySelector('.open');
    const modalClose = document.querySelector('.modal__form-close');
    const modal =document.querySelector('#modal');

    modalOpen.addEventListener('click', ()=>{
        modal.style.display="block";
        modal.classList.add('fadeIn');
        modal.classList.remove('fadeOut');
        document.body.style.overflow = 'hidden';
    });
    function closeModal(){
        modal.classList.add('fadeOut');
        modal.classList.remove('fadeIn');
        document.body.style.overflow = '';
    }
    modalClose.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e)=>{
        if(e.code === 'Escape'){
            closeModal();
        }
    })
    /*validate*/

    const userName = document.querySelector(".name");
    const userPassword = document.querySelector(".password");
    const modalBtn = document.querySelector('.modal__btn');

    function validate(){
        let errors = '';
        if(userName.value === '' || userPassword.value ===''){
            alert(' заполните все поля ');
        }if(userName.value.length < 2){
            errors +='имя должно содержать не менее 2 символов \n';
            userName.style.border ='3px solid #ff0000';
        }if(userPassword.value.length < 6){
            errors +=' пароль должен содержать не менее 6 символов \n ';
            userPassword.style.border ='3px solid #ff0000';
        }
        if(errors ===""){
            console.log('ok');
            return true;
        }
        else
        {
            alert(errors);
            return false;
        }
    }
    modalBtn.addEventListener('click', validate);
});
