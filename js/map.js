;(function(){
    if(typeof ymaps === 'undefined'){
        return;
    }
    ymaps.ready(function () {
        var myMap = new ymaps.Map('ymap', {
                center: [43.279898, 76.822459],
                zoom: 16
            }, {
                searchControlProvider: 'yandex#search'
            }),
    
            myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
                balloonContent: 'г. Алматы Алматы Арена, 86'
            }, {
               
                iconLayout: 'default#image',
              
                iconImageHref: '../image/common/marker.svg',
           
                iconImageSize: [40, 63.2],
               
                iconImageOffset: [-50, -38]
            });
               
    
        myMap.geoObjects.add(myPlacemark);
        myMap.behaviors.disable('scrollZoom');
            
    });
})();