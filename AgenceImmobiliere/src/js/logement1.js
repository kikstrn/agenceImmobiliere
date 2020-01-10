//Funcion to insert the map
let marker;
let marker_home;
function initMap(listener) {
    // les coordonnées de Lievin
    let agence = {
        lat: 50.6363723,
        lng: 3.0612862
    };

    let home = {
        lat: 50.62963423309266,
        lng: 3.035847034806693
    };

    let content = "<h5>Agence Immo 2020</h5> <p>39 rue nationale</p><p>59000 Lille</p>";
    let content_home = "<h5>Maison de 275 m²</h5> <p>2 Rue de Turenne</p><p>59000 Lille</p>";

    let affichePlace = document.querySelector("#maps");

    let map = new google.maps.Map(affichePlace, {
        zoom: 13,
        center: agence
    });


    marker = new google.maps.Marker({
        position: agence,
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        icon: new google.maps.MarkerImage('http://maps.google.com/mapfiles/kml/paddle/wht-circle.png')
    });



     marker_home = new google.maps.Marker({
        position: home,
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        icon: new google.maps.MarkerImage('http://maps.google.com/mapfiles/kml/paddle/wht-circle.png')
    });

    let infos = new google.maps.InfoWindow({
        content: content,
        position: agence,
        zIndex: 999999999,
        pixelOffset: new google.maps.Size(0, -60)
    });

    let infos_home = new google.maps.InfoWindow({
        content: content_home,
        position: home,
        zIndex: 999999999,
        pixelOffset: new google.maps.Size(0, -60)
    });

    /* marker.addListener("click", function () {
         infos.open(map);
     });
     */

    let directionsService = new google.maps.DirectionsService();
    let directionsDisplay = new google.maps.DirectionsRenderer({'map': map});
    let distance = new google.maps.DistanceMatrixService;
    let request = {
        origin: agence,
        destination: home,
        travelMode: google.maps.DirectionsTravelMode.DRIVING,
        unitSystem: google.maps.DirectionsUnitSystem.METRIC
    };
    directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            directionsDisplay.setOptions({'suppressMarkers': true});
            direct
        }
    });

    marker.addListener("mouseover", () => {
        infos.open(map);
    });

    marker_home.addListener("mouseover", () => {
        infos_home.open(map);
    });

    marker.addListener("mouseout", () => {
        infos.close(map);
    });

    marker_home.addListener("mouseout", () => {
        infos_home.close(map);
    });

    marker.addListener('click', toggleBounce);
    marker_home.addListener('click', toggleBounce2);

}

function toggleBounce() {
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}

function toggleBounce2() {
    if (marker_home.getAnimation() !== null) {
        marker_home.setAnimation(null);
    } else {
        marker_home.setAnimation(google.maps.Animation.BOUNCE);
    }
}

initMap();

