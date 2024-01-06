async function signUp(e) {
    try {
        e.preventDefault();
        console.log(e.target.email.value);

        const signupDetails = {
            name: e.target.username.value,
            email: e.target.email.value,
            password: e.target.password.value
        }
        console.log(signupDetails);

        const response = await axios.post('http://localhost:3000/user/signup', signupDetails);

        if (response.status === 201) {
            window.location.href = "./login.html";
        } else {
            throw new Error('Failed to sign up');
        }
    } catch (err) {
        // Check if the error message contains information about the user already existing
        if (err.response && err.response.data && err.response.data.err === 'User with this email already exists') {
            // Display a message to the user
            const userexists = document.querySelector('#user-exists');
            userexists.style.display = 'block';
        } else {
            // Display a generic error message
            const errorMessage = document.createElement('div');
            errorMessage.textContent = err.message;
            errorMessage.style.color = 'red';
            errorMessage.style.position = 'fixed';
            errorMessage.style.top = '70%';
            errorMessage.style.left = '50%';
            errorMessage.style.transform = 'translate(-50%, -50%)';
            document.body.appendChild(errorMessage);
        }
    }
};

async function forgotPass(e) {
    try{
        e.preventDefault();
        console.log(e.target.email.value);

        const recoverDetails = {
            email : e.target.email.value
        }
        console.log(recoverDetails);
        
        const response = await axios.post('http://localhost:3000/user/getPassword', recoverDetails);

        if (response.status === 200) {
            // Display the password to the user (not recommended)
            console.log(response.data.password);
            const passheading = document.querySelector('#pass');
            if(passheading.innerHTML != '')
            {
                passheading.innerHTML = '';
            }
            passheading.innerHTML += response.data.password;
        } else {
            throw new Error('Failed to retrieve password');
        }
    } 
    catch (err) {
        // Display an error message to the user
        console.error(err.message);
    }
}
