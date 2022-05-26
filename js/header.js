;(function(){
    if(window.matchMedia("(max-width: 992px)").mathces){
        return;
    }
  let headerPage =  document.querySelector(".header-page");
 
  window.addEventListener("scroll", function(){
     if(window.pageYOffset > 0){
         headerPage.classList.add("is-active");
     } else {
         headerPage.classList.remove("is-active");
     }
  });
})();