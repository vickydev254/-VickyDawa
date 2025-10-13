
  function sendMail(event) {
    event.preventDefault(); // prevent form from submitting

    // Get form values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("Subject").value.trim();
    const message = document.getElementById("message").value.trim();

    // Basic validation
    if (!name || !email || !subject || !message) {
      alert("Please fill in all fields.");
      return;
    }

    // Email format validation
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(emailPattern)) {
      alert("Please enter a valid email address.");
      return;
    }

    // If everything is valid
    alert("Thank you! Your message has been sent successfully.");

    // You can integrate with an actual email service like EmailJS or Formspree here

    // Optionally reset the form
    document.querySelector("form").reset();
  }

