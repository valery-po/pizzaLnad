

/* libs end */

;(function() {
    let canUseWebP = function() {
        let elem = document.createElement('canvas');
    
        if (!!(elem.getContext && elem.getContext('2d'))) {
            // was able or not to get WebP representation
            return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
        }
    
        // very old browser like IE 8, canvas not supported
        return false;
    };
     
    let isWebpSupported = canUseWebP();


    
  if (isWebpSupported === false) {
    let lazyItems = document.querySelectorAll('[data-src-replace-webp]');

    for (let i = 0; i < lazyItems.length; i += 1) {
      let item = lazyItems[i];

      let dataSrcReplaceWebp = item.getAttribute('data-src-replace-webp');
      if (dataSrcReplaceWebp !== null) {
        item.setAttribute('data-src', dataSrcReplaceWebp);
      }
    }
  }


    let lazyLoadInstance = new LazyLoad({
    elements_selector: ".lazy"
    
  });
})();

/* libs end */





/* My Lib start */
;(function(){
    window.myLib = {};
  
    window.myLib.body = document.querySelector('body');
  
  
    window.myLib.closeAttr = function(item, attr){
      let node = item;
      while(node){
          let attrValue = node.getAttribute(attr);
          if(attrValue){
              return attrValue;
          } else {
             node = node.parentElement;
           
          }
  
          
      }
  
      return null;
  
      
  
  };
  
  
   window.myLib.closestItemByClass = function(item, className){
          let node = item;
          while(node){
              if(node.classList.contains(className)){
                  return node;
              } else {
                 node = node.parentElement;
               
              }
  
              
          }
  
          return null;
      };
  
      window.myLib.toggleScroll = function(){
          myLib.body.classList.toggle('no-scroll');
      };
  
  })();

/* My Lib end */

/* header */

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

/* header */

/*popup */
;(function(){
    showPopup = function(target){
       target.classList.add('is-active');
     };
 
     closePopup = function(target){
         target.classList.remove('is-active');
     };
 
    
     
     myLib.body.addEventListener("click", function(e){
        let target = e.target;
        let popupClass = myLib.closeAttr(target, 'data-popup');
 
        if(popupClass === null){
            return;
        }
 
        e.preventDefault();
 
        let popup = document.querySelector('.' + popupClass);
 
        if(popup){
            showPopup(popup);
            myLib.toggleScroll();
        }
        
       
     });
 
     myLib.body.addEventListener("click", function(e){
       let target = e.target;
 
       if(target.classList.contains('popup-close') || target.classList.contains('popup__inner')){
           let popup = myLib.closestItemByClass(target,'popup');
           closePopup(popup);
           myLib.toggleScroll();
         }
     });
 
     myLib.body.addEventListener("keydown", function(e){
         if(e.keyCode !== 27){
           return;
         } else {
              let popup = document.querySelector('.popup.is-active');
 
              if(popup){
                  closePopup(popup);
                  myLib.toggleScroll();
              }
         }
     });
   
})();



/*popup*/

/*scroll to*/
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


/*scroll to*/


/*catalog*/
;(function(){
    catalogSection = document.querySelector('.section-catalog');
    
    if(catalogSection === null){
        return;
    }
  
    let removeChildren = function(item) {
      while (item.firstChild) {
        item.removeChild(item.firstChild);
      }
    };
  
    let updateChildren = function(item, children) {
        console.log(children);
      removeChildren(item);
      for (let i = 0; i < children.length; i += 1) {
        item.appendChild(children[i]);
      }
    };
  
    let catalog = catalogSection.querySelector('.catalog');
    let catalogNav = catalogSection.querySelector('.catalog-nav');
    let catalogItems = catalogSection.querySelectorAll('.catalog__item');
  
     catalogNav.addEventListener("click", function(e) {
         let target = e.target;
         let item = myLib.closestItemByClass(target, 'catalog-nav__btn');
        
  
        if(item === null || item.classList.contains('is-active')){
          return;
        }
  
        e.preventDefault();
        let filterValue = item.getAttribute('data-filter');
        let previousBtnActive = catalogNav.querySelector('.catalog-nav__btn.is-active');
        previousBtnActive.classList.remove('is-active');
        item.classList.add('is-active');
        
        if (filterValue === 'all') {
          updateChildren(catalog, catalogItems);
          return;
        
      } else if (filterValue !== 'all') {
            let filteredItems = [];
            for (let i = 0; i < catalogItems.length; i += 1) {
              let current = catalogItems[i];
              if (current.getAttribute('data-category') === filterValue) {
                filteredItems.push(current);
              }
            }
  
            updateChildren(catalog, filteredItems);
        }
  
  
    })
})();

/*catalog*/

/*product*/
;(function(){
    let catalog =  document.querySelector('.catalog');
  
    if(catalog === null){
        return;
    }
  
  
    let updateProductPrice = function(product, price) {
       let productPrice = product.querySelector('.product__price-value');
       productPrice.textContent = price;
    };
  
    let changeProductSize = function(target){
      
      let product = myLib.closestItemByClass(target, 'product');
      let previousBtnActive = product.querySelector('.product__size.is-active');
      let newPrice = target.getAttribute('data-product-size-price');
      
      previousBtnActive.classList.remove('is-active');
      target.classList.add('is-active');
      updateProductPrice(product, newPrice);
      
    };
  
  
    let changeProductOrderInfo = function(target) {
      let product = myLib.closestItemByClass(target, 'product');
      let order = document.querySelector('.popup-order');
      
      let productTitle = product.querySelector('.product__title').textContent;
      let productSize = product.querySelector('.product__size.is-active').textContent;
      let productPrice = product.querySelector('.product__price-value').textContent;
      let productImgSrc = product.querySelector('.product__img').getAttribute('src');
  
      order.querySelector('.order-info-title').setAttribute('value', productTitle);
      order.querySelector('.order-info-size').setAttribute('value', productSize);
      order.querySelector('.order-info-price').setAttribute('value', productPrice);
     
      order.querySelector('.order__img').setAttribute('src', productImgSrc);
      order.querySelector('.order-product-title').textContent = productTitle;
      order.querySelector('.order-product-price').textContent = productPrice;
      order.querySelector('.order__size').textContent = productSize;
    }
  
    catalog.addEventListener("click", function(e){
        let target = e.target;
        if(target.classList.contains('product__size') && !target.classList.contains('is-active')){
          e.preventDefault();
          changeProductSize(target);
        }
        if(target.classList.contains('product__btn')){
          e.preventDefault();
          changeProductOrderInfo(target);
        }
    });
})();


/*product*/

/*map*/
;(function() {
    var sectionContacts = document.querySelector('.section-contacts');
  
    var ymapInit = function() {
      if (typeof ymaps === 'undefined') {
        return;
      }
    
      ymaps.ready(function () {
        var myMap = new ymaps.Map('ymap', {
                center: [55.755241, 37.617779],
                zoom: 16
            }, {
                searchControlProvider: 'yandex#search'
            }),
    
            myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
                balloonContent: 'г. Москва, Преображенская площадь, 8'
            }, {
                iconLayout: 'default#image',
                iconImageHref: '../img/common/marker.svg',
                iconImageSize: [40, 63.2],
                iconImageOffset: [-50, -38]
            });
    
        myMap.geoObjects.add(myPlacemark);
    
        myMap.behaviors.disable('scrollZoom');
      });
    };
  
    var ymapLoad = function() {
      var script = document.createElement('script');
      script.src = 'https://api-maps.yandex.ru/2.1/?lang=en_RU';
      myLib.body.appendChild(script);
      script.addEventListener('load', ymapInit);
    };
  
    var checkYmapInit = function() {
      var sectionContactsTop = sectionContacts.getBoundingClientRect().top;
      var scrollTop = window.pageYOffset;
      var sectionContactsOffsetTop = scrollTop + sectionContactsTop;
  
      if (scrollTop + window.innerHeight > sectionContactsOffsetTop) {
        ymapLoad();
        window.removeEventListener('scroll', checkYmapInit);
      }
    };
  
    window.addEventListener('scroll', checkYmapInit);
    checkYmapInit();
  })();

/*map*/

/*form*/
;(function() {
    let forms = document.querySelectorAll('.form-send');
  
    if (forms.length === 0) {
      return;
    }
  
    let serialize = function(form) {
      let items = form.querySelectorAll('input, select, textarea');
      let str = '';
      for (let i = 0; i < items.length; i += 1) {
        let item = items[i];
        let name = item.name;
        let value = item.value;
        let separator = i === 0 ? '' : '&';
  
        if (value) {
          str += separator + name + '=' + value;
        }
      }
      return str;
    };
  
    let formSend = function(form) {
      let data = serialize(form);
      let xhr = new XMLHttpRequest();
      let url = 'mail/mail.php';
      
      xhr.open('POST', url);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  
      xhr.onload = function() {
        let activePopup = document.querySelector('.popup.is-active');
  
        if (activePopup) {
          activePopup.classList.remove('is-active');
        } else {
          myLib.toggleScroll();
        }
  
        if (xhr.response === 'success') {
          document.querySelector('.popup-thanks').classList.add('is-active');
        } else {
          document.querySelector('.popup-error').classList.add('is-active');
        }
  
        form.reset();
      };
  
      xhr.send(data);
    };
  
    for (let i = 0; i < forms.length; i += 1) {
      forms[i].addEventListener('submit', function(e) {
        e.preventDefault();
        let form = e.currentTarget;
        formSend(form);
      });
    }



})();


/*form*/


