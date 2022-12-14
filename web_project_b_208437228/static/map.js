const params = new URLSearchParams(window.location.search);
const hamburger = document.getElementById('hamburger');

const coordinates = new google.maps.LatLng(params.get('x'), params.get('y'));

//create a google maps map 
const myOptions = {
    zoom: 15,
    center: coordinates,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};

const map = new google.maps.Map(document.getElementById("map"), myOptions);

//put a marker of the user position 
const measle = new google.maps.Marker({
    position: coordinates,
    map: map,
    icon: {
      url: "https://maps.gstatic.com/intl/en_us/mapfiles/markers2/measle.png",
      size: new google.maps.Size(7, 7),
      anchor: new google.maps.Point(4, 4)
    }
});

//add text table on the map
var marker = new google.maps.Marker({
    position: coordinates,
    map: map,
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
      labelOrigin: new google.maps.Point(75, 32),
      size: new google.maps.Size(32,32),
      anchor: new google.maps.Point(16,32)
    },
    label: {
      text: "You Are Here! +-",
      color: "#fff",
      fontWeight: "bold"
    }
});

//haburger when there is a mobile screen
hamburger.addEventListener('click', e => {
  hamburger.classList.toggle('show');
})