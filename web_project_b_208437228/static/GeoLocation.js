const radius = document.getElementById('radius');
const carType = document.getElementById('CarType');
const checkbox = document.getElementById('checkbox');
const form = document.getElementById('form');
const hamburger = document.getElementById('hamburger');
let x;
let y;

//get the current position of the device
function GetLocation() {
    navigator.geolocation.getCurrentPosition(showPosition, errorCb);
};

//update checkbox position and save the cordination of the users position
function showPosition(position) {
    checkbox.checked = true;
    x = position.coords.latitude;
    y = position.coords.longitude; 
}

//if there is no geoLocation access checkbox is false 
function errorCb(error) {
    if(error.code == error.PERMISSION_DENIED) {
        checkbox.checked = false;
    }
}

//called whenever the specified event is delivered to the target  if the event does not get explicitly handled, its default action should not be taken.
form.addEventListener('submit', e => {
    e.preventDefault()
    //searchPark();
})

//check that there are inputs and that there are valid before passing to the next page
const searchPark = () => {
    if(!radius.value.length) {
        radius.style = 'outline: 1px solid #c00';
    } else {
        radius.style = 'outline: 1px solid #0c0';
    }
    
    if(checkbox.checked === false) {
        checkbox.style = 'outline: 1px solid #c00';
    } else {
        checkbox.style = 'outline: 1px solid #0c0';
    }
    
    // add DB logic here if needed.
    if(radius.value.length && !checkbox.checked === false){
        radius.style = 'outline: 1px solid #0c0';
        checkbox.style = 'outline: 1px solid #0c0';
        const href = window.location.href.split('/');
        href.pop()
        form.setAttribute('action', `${href.join('/')}/Page2-Map.html?y=${y}&x=${x}&cartype=${carType.value}`)
        form.submit()
    }
}

//haburger when there is a mobile screen
hamburger.addEventListener('click', e => {
    hamburger.classList.toggle('show');
})

//check that the email is valid
const ValidateEmail = () => {
    const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if(!emailRegex.test(email.value)) {
        email.style = 'border: 1px solid #c00';
        email.focus();
    } else {
        email.style = 'border: 1px solid #0c0';
    }
}
  
  