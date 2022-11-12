const signinForm = document.getElementById('signin-form');
const signupForm = document.getElementById('signup-form');
const updateForm = document.getElementById('update-form');
const userName = document.getElementById('userName');
const password = document.getElementById('password');
const newPassword = document.getElementById('newPassword');

//Function that validate the users password
const ValidatePassword = (password) => {
    const passwordRegex=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
    if(!passwordRegex.test(password.value)) {
        password.style = 'border: 1px solid #c00';
        password.focus();
        alert('The password must be between 8 to 20 characters which contain at least one lowercase letter, one uppercase letter and one numeric digit');
        return false;
    } else {
        password.style = 'border: 1px solid #0c0'; 
        return true;
    };
};

// Function that chack that there is a user with user name and password in the DB and pass the user to the home page 
signinForm?.addEventListener('submit', async e => {
    e.preventDefault();
    const passwordValid = ValidatePassword(password);
    if(!passwordValid) return;
    const data = {
        userName: userName.value,
        password: password.value
    };
    try {
        const res = await fetch('/api/signin', 
        {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
         });
         if(res.status === 400) {
            throw new Error("No user found");
         };
         const dataFromRes = await res.json();
         localStorage.setItem('username', dataFromRes[0].userName);
        window.location.assign('homepage');
    } catch (err) {
        alert(err);
    };
});

// Function that create a new user with user name and password and add it to the DB and pass the user to the home page 
signupForm?.addEventListener('submit', async e => {
    e.preventDefault();
    const passwordValid = ValidatePassword(password);
    if(!passwordValid) return;
    const data = {
        userName: userName.value,
        password: password.value
    };
    try {
        const res = await fetch('/api/createNewUser', 
        {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
         });
         const dataFromRes = await res.json();
         localStorage.setItem('username', data.userName);
        window.location.assign('homepage');
    } catch (err) {
        console.log(err);
    }
});

//Function that pass the user to the sign in page after he change his password
updateForm?.addEventListener('submit', async e => {
    e.preventDefault();
    const passwordValid = ValidatePassword(newPassword);
    if(!passwordValid) return;
    const data = {
        userName: userName.value,
        newPassword: newPassword.value
    };
    try {
        const res = await fetch('/api/updatePassword', 
        {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
         });
         const dataFromRes = await res.json();
         alert('Password Updated'),

        window.location.assign('signIn');
    } catch (err) {
        console.log(err);
    };
});

