// Google maps


var Url = (window.location.origin);


var mapContainer = document.getElementById('map');

if(mapContainer !== null) {

    var  myCollections = [];
    var mapLanguage = "hy"; // Get this with PHP
    var imageBank = '/img/design-elements/maps/32x32/marker_bank.png';
    var imageUco = '/img/design-elements/maps/32x32/marker_uco.png';
    var imageAtm = '/img/design-elements/maps/32x32/marker_atm.png';

    var map;
    ymaps.ready(initMap);

    function initMap(lng, lat) {

        var map_lat = 40.177636;
        var map_lng = 44.512481;

        if (typeof (lng) !== 'undefined' && typeof (lat) !== 'undefined') {
            map_lat = lat;
            map_lng = lng;

            map = new ymaps.Map(mapContainer, {
                center: {lng: map_lng, lat: map_lat},
                zoom: 14,
                disableDefaultUI: false,
                type : 'yandex#map',
               // styles:
            });
        } else {
            map = new ymaps.Map(mapContainer, {
                center: [40.177636, 44.512481],
                zoom: 14,
                disableDefaultUI: false,
                type : 'yandex#map',

            });
            map.controls.remove('trafficControl').remove('searchControl');

            var script = document.createElement('script');

            if (mapDataUrl !== undefined && mapDataUrl !== null) {
                script.src = mapDataUrl;
            } else {
                script.src = '/maps/0/all.json';
            }
            document.getElementsByTagName('head')[0].appendChild(script);
        }
    }

    window.eqfeed_callback = function (results) {
        for (var i = 0; i < results.features.length; i++) {

            var contentString = "";
            var coords = results.features[i].geometry.coordinates;
            var entityType = results.features[i].properties.entityType; // 0 Bank; 1 ATM
            var entityMarker = results.features[i].properties.entityMarker;
            var entityTitle = results.features[i].properties.entityTitle[mapLanguage];
            var entityAddress = results.features[i].properties.entityAddress[mapLanguage];
            var entityPhoneNumbers = results.features[i].properties.entityPhoneNumbers;

            switch (entityType) {
                case 0:
                    if (entityMarker !== "") {
                        var mapIcon = entityMarker;
                    } else {
                        var mapIcon = imageBank;
                    }
//                    mapIcon = imageBank;
                    break;
                case 1:
                    if (entityMarker !== "") {
                        var mapIcon = entityMarker;

                    } else {
                        var mapIcon = imageAtm;
                    }
//                    mapIcon = imageAtm;
                    break;
                case 2:
                    if (entityMarker !== "") {
                        var mapIcon = entityMarker;
                    } else {
                        var mapIcon = imageUco;
                    }
//                    mapIcon = imageUco;
                    break;
            }

            contentString = "<b>" + entityTitle + "</b><hr>" + entityAddress + "<br>";

            if (entityType == 0 || entityType == 2) {
                 contentString += "<br>" + entityPhoneNumbers;

            }

            var myCollection = new ymaps.GeoObjectCollection({}, { });

            myCollection.add(new ymaps.Placemark([coords.lat, coords.long], {

                    balloonContent: contentString,
                    iconContent: entityTitle,
                    hintContent:  entityTitle,
                }, {
                iconLayout: 'default#image',
                iconImageHref: mapIcon,
                iconImageSize: [30, 30],
                iconImageOffset: [-5, -30],
                iconContentOffset: [15, 15],
            }));


            map.geoObjects.add(myCollection);
            myCollections.push(myCollection);
        }

    }

    function clearOverlays() {

       for (var i = 0; i < myCollections.length; i++) {

           myCollections[i].remove();

       }

        myCollections.length = 0;
    }


        function reinitMap(mapDataUrl, lat, lng) {

            clearOverlays();

            var script = document.createElement('script');
            if (mapDataUrl !== undefined && mapDataUrl !== null) {
                script.src = mapDataUrl;
            } else {
                script.src = '/maps/0/all.json';
            }

            document.getElementsByTagName('head')[0].appendChild(script);


            $('html, body').animate({
                scrollTop: $('#map').offset().top - 50
            }, 500);

        }

  }