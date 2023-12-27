const DB_URL = window.config.DB_URL;

document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('signupForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const contactNo = document.getElementById('contactNo').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Use fetch to make a POST request to your backend
        fetch(`${DB_URL}/api/user/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, address, contactNo, email, password }),
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    return response.json().then((errorData) => {
                        // Check if the error message indicates an existing user
                        if (errorData.message === 'Email already in use') {
                            return { success: true, message: 'Email already in use' };
                        }
                        throw new Error(errorData.message);
                    });
                }
            })
            .then(data => {
                console.log("Success:", data);
                if (data.message === 'User signed up successfully') {
                    showConfirmationMessage("confirmationMessage", true, "Thanks for signing up!");
                }
                else if (data.message === 'Email already in use') {
                    showConfirmationMessage("confirmationMessage", false, "Email already in use!");
                }
                else {
                    showConfirmationMessage("confirmationMessage", false, "Sign up failed. Please try again!");
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showConfirmationMessage("confirmationMessage", false, "Sign up failed. Please try again!");
            });
    });
});

function showConfirmationMessage(confirmationId, isSuccess, message) {
    const confirmationMessage = document.getElementById(confirmationId);
    confirmationMessage.textContent = message;

    if (isSuccess) {
        confirmationMessage.style.color = "green";
    } else {
        confirmationMessage.style.color = "red";
    }

    confirmationMessage.style.display = "block";

    setTimeout(() => {
        confirmationMessage.style.display = "none";
    }, 5000);
}