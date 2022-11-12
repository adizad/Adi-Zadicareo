const params = new URLSearchParams(window.location.search);
const coordinates = new google.maps.LatLng(params.get("x"), params.get("y"));

//Function that show the google map map with the users point and The parkinglots 
window.addEventListener("load", () => {
  const myOptions = {
    zoom: 15,
    center: coordinates,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  };

  const map = new google.maps.Map(document.getElementById("map"), myOptions);

  //Put a marker of the user position
  const measle = new google.maps.Marker({
    position: coordinates,
    map: map,
    icon: {
      url: "https://maps.gstatic.com/intl/en_us/mapfiles/markers2/measle.png",
      size: new google.maps.Size(7, 7),
      anchor: new google.maps.Point(4, 4),
    },
  });

  //Add text table on the map
  var marker = new google.maps.Marker({
    position: coordinates,
    map: map,
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
      labelOrigin: new google.maps.Point(75, 32),
      size: new google.maps.Size(32, 32),
      anchor: new google.maps.Point(16, 32),
    },
    label: {
      text: "You Are Here! +-",
      color: "#fff",
      fontWeight: "bold",
    },
  });

  const findByRadius = async () => {
    const data = await fetch(`/api/getAllParkinglot`);
    const {result} = await data.json();

    result.forEach((parkingLot) => {
      const coordinates = new google.maps.LatLng(parkingLot.X, parkingLot.Y);

      //Put a marker of the parkinglot position
      const measle = new google.maps.Marker({
        position: coordinates,
        map: map,
        icon: {
          url: "https://maps.gstatic.com/intl/en_us/mapfiles/markers2/measle.png",
          size: new google.maps.Size(7, 7),
          anchor: new google.maps.Point(4, 4),
        },
      });

      //Add the parkinglot address table on the map
      const marker = new google.maps.Marker({
        position: coordinates,
        map: map,
        icon: {
          url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
          labelOrigin: new google.maps.Point(75, 32),
          size: new google.maps.Size(32, 32),
          anchor: new google.maps.Point(16, 32),
        },
        label: {
          text: parkingLot.Name,
          color: "#fff",
          fontSize: "10px"
        },
      });

      //send ajax to /api/userParking with the relavent body
      marker.addListener('click', async () => {
        const res = await fetch('/api/userParking', 
        {
            method: 'PUT',
            body: JSON.stringify({x: parkingLot.X, y: parkingLot.Y, parkinglotName: parkingLot.Name, carType: params.get('cartype') }),
            headers: {
                'Content-Type': 'application/json'
            }
         });

         const data = await res.json();
         if(!data.success) {
          alert('Not availabe parkings, please choose another parkinglot');
         } else if(data.success) {
          window.location.assign(`leave?x=${parkingLot.X}&y=${parkingLot.Y}&parkinglot=${parkingLot.Name}&cartype=${params.get('cartype')}`);
         }
      })
    });
  };

  findByRadius();
});
