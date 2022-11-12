const carType = document.getElementById('CarType');
const checkbox = document.getElementById('checkbox');
const form = document.getElementById('form');
const hamburger = document.getElementById('hamburger');
const allowGeo = document.getElementById('allowGeo');
const email = document.getElementById('email');
const contactUsForm = document.getElementById('contact-us-form');
let x;
let y;

//Get the current position of the device
allowGeo?.addEventListener('click', e => {
    e.preventDefault();
    navigator.geolocation.getCurrentPosition(showPosition, errorCb);
});

//Update checkbox position and save the cordination of the users position
function showPosition(position) {
    checkbox.checked = true;
    x = position.coords.latitude;
    y = position.coords.longitude; 
};

//If there is no geoLocation access checkbox is false 
function errorCb(error) {
    if(error.code == error.PERMISSION_DENIED) {
        checkbox.checked = false;
    };
};

//Called whenever the specified event is delivered to the target  if the event does not get explicitly handled, its default action should not be taken.
form?.addEventListener('submit', e => {
    e.preventDefault();
    searchPark();
});

//Check that there are inputs and that there are valid before passing to the next page
const searchPark = () => {
    if(checkbox.checked === false) {
        checkbox.style = 'outline: 1px solid #c00';
    } else {
        checkbox.style = 'outline: 1px solid #0c0';
    };
    // Add DB logic here if needed.
    if(!checkbox.checked === false){
        checkbox.style = 'outline: 1px solid #0c0';
        const href = window.location.href.split('/');
        href.pop();
        window.location.assign(`${window.location.origin}/map?y=${y}&x=${x}&cartype=${carType.value}`)
    };
};

//Haburger when there is a mobile screen
hamburger?.addEventListener('click', e => {
    hamburger.classList.toggle('show');
});

//Check that the email is valid
const ValidateEmail = (email) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(emailRegex.test(email)) {
        email.style = 'border: 1px solid #c00';
        email.focus();
        alert('Invalid Email');
        return false;
    } else {
        email.style = 'border: 1px solid #0c0';
        return true;
    };
};

//Send the user to Thankyou page after he send a massage
contactUsForm?.addEventListener('submit', e => {
   e.preventDefault();
   window.location.assign('ThankYou');
});
