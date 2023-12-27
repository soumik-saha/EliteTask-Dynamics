const DB_URL = window.config.DB_URL;

document.addEventListener("DOMContentLoaded", function () {
    document
        .getElementById("contactForm")
        .addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const message = document.getElementById("message").value;

            // Use fetch to make a POST request to your backend
            fetch(`${DB_URL}/api/contact-us`, {
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