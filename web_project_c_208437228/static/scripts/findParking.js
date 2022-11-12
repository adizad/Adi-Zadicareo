const findParkingForm = document.getElementById('find-parking');
const searchQuery = document.getElementById('searchName');
const address = document.getElementById('address');

//The call to the function that find parkinglot by name when the user press search
findParkingForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const searchName = searchQuery.value;
    const res = await fetch(`/api/findParkingLot?searchName=${searchName}`);
    console.log(res.status);
    if(res.status == 404) {
        return address.innerText = 'Address: Not Found';
    };
    console.log(2);
    const data = await res.json();     
    address.innerText = "Address: " + data.result;
});