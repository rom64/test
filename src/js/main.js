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
});
