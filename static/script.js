document.getElementById("feedbackForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();

    let result = document.getElementById("result");

    // Name validation
    if (name.length < 3) {
        result.innerText = "Name must be at least 3 characters";
        result.style.color = "red";
        return;
    }

    // Email validation (regex)
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        result.innerText = "Enter a valid email address";
        result.style.color = "red";
        return;
    }

    // Message validation
    if (message.length < 5) {
        result.innerText = "Message must be at least 5 characters";
        result.style.color = "red";
        return;
    }

    fetch("/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, message })
    })
    .then(response => response.json())
    .then(data => {
        result.innerText = data.msg;
        result.style.color = "green";
        document.getElementById("feedbackForm").reset();
    });
});
