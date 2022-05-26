;(function(){
  




   let scroll = function(target) {
     let targetTop = target.getBoundingClientRect().top;
     let scrollTop = window.pageYOffset;
     let targetOffsetTop = targetTop + scrollTop;
     let headerOffset = document.querySelector('.header-page').clientHeight;
     window.scrollTo(0, targetOffsetTop - headerOffset + 20);
   }

  myLib.body.addEventListener('click', function(e) {
     let target = e.target;
     let scrollItemToClass = myLib.closeAttr(target,'data-scroll-to');

     if(scrollItemToClass === null){
        return;
      } else {
          e.preventDefault();
          let scrollToItem = document.querySelector('.' + scrollItemToClass);

          if(scrollToItem){
              scroll(scrollToItem);
          }
      }

    })
})();