const params = new URLSearchParams(window.location.search);
const leaveBtn = document.getElementById('leaveBtn');

//Function that save parameters from the user and call the function that update the DB that there is a new empty parking in the parkinglot
const leave = async () => {
    const res = await fetch('/api/leaveParking', 
    {
        method: 'PUT',
        body: JSON.stringify({x: params.get('x'), y: params.get('y'), parkinglotName: params.get('parkinglot'), carType: params.get('cartype') }),
        headers: {
            'Content-Type': 'application/json'
        }
     });

     const data = await res.json();

     if(data.success) {
        window.location.assign(`ThankYou`);

     };
};

//Function that call the leave function when the user press the leave button the 
leaveBtn.addEventListener('click', e => {
    e.preventDefault();
    leave();
});