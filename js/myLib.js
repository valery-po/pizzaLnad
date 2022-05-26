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