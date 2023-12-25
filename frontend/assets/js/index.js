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
                    // Handle success, e.g., show a success message to the user
                })
                .catch((error) => {
                    console.error("Error:", error);
                    // Handle errors, e.g., show an error message to the user
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
                .then((response) => response.json())
                .then((data) => {
                    console.log("Success:", data);
                    // Handle success, e.g., show a success message to the user
                })
                .catch((error) => {
                    console.error("Error:", error);
                    // Handle errors, e.g., show an error message to the user
                });
        });
});

