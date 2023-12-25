document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('signupForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const contactNo = document.getElementById('contactNo').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Use fetch to make a POST request to your backend
        fetch('http://localhost:3000/api/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, address, contactNo, email, password }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                // Handle success, e.g., show a success message to the user
            })
            .catch(error => {
                console.error('Error:', error);
                // Handle errors, e.g., show an error message to the user
            });
    });
});