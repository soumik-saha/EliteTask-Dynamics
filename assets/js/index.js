document.addEventListener("DOMContentLoaded", function () {
    document
        .getElementById("contactForm")
        .addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const message = document.getElementById("message").value;

            // Use fetch to make a POST request to your backend
            fetch("http://localhost:3000/api/contact-us", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, message }),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Success:", data);
                    showConfirmationMessage("contactConfirmationMessage", true, "Contact form submitted successfully!");
                })
                .catch((error) => {
                    console.error("Error:", error);
                    showConfirmationMessage("contactConfirmationMessage", false, "Contact form submission failed. Please try again.");
                });
        });
});

document.addEventListener("DOMContentLoaded", function () {
    document
        .getElementById("newsletterForm")
        .addEventListener("submit", function (e) {
            e.preventDefault();

            const email = document.getElementById("newsletterEmail").value;

            fetch("http://localhost:3000/api/newsletter", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        return response.json().then((errorData) => {
                            // Check if the error message indicates an existing subscription
                            if (errorData.message === 'Email already subscribed') {
                                return { success: true, message: 'Email already subscribed' };
                            }
                            throw new Error(errorData.message);
                        });
                    }
                })
                .then((data) => {
                    console.log("Success:", data);
                    if (data.message === 'Newsletter subscription successful') {
                        showConfirmationMessage("newsletterConfirmationMessage", true, "Newsletter subscription successful!");
                    } 
                    else if (data.message === 'Email already subscribed') {
                        showConfirmationMessage("newsletterConfirmationMessage", false, "You have already subscribed to our newsletter!");
                    } 
                    else {
                        showConfirmationMessage("newsletterConfirmationMessage", false, "Newsletter subscription failed. Please try again!");
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                    showConfirmationMessage("newsletterConfirmationMessage", false, "Newsletter subscription failed. Please try again!");
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