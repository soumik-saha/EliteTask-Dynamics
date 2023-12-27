const DB_URL = window.config.DB_URL;

document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('signinForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Use fetch to make a POST request to your backend
        fetch(`${DB_URL}/api/user/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    return response.json().then((errorData) => {
                        // Check if the error message indicates an existing user
                        if (errorData.message === 'Invalid credentials') {
                            return { success: true, message: 'Invalid credentials' };
                        }
                        throw new Error(errorData.message);
                    });
                }
            })
            .then(data => {
                console.log("Success:", data);
                if (data.message === 'Invalid credentials') {
                    showConfirmationMessage("confirmationMessage", false, "Invalid credentials! Please try again.");
                } else {
                    showConfirmationMessage("confirmationMessage", true, "You have signed in successfully!");
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showConfirmationMessage("confirmationMessage", false, "sign in failed. Please try again later!");
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