// =============================================
//  MENU ICON TOGGLE
// =============================================
const menuIcon = document.getElementById('menu-icon');
const navbar = document.getElementById('navbar');

menuIcon.addEventListener('click', () => {
    navbar.classList.toggle('open');
    menuIcon.classList.toggle('bx-x');
});

// Close navbar when a link is clicked
navbar.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('open');
        menuIcon.classList.remove('bx-x');
    });
});

// Close navbar when clicking outside
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && !menuIcon.contains(e.target)) {
        navbar.classList.remove('open');
        menuIcon.classList.remove('bx-x');
    }
});

// Active nav link on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});


// =============================================
//  HIRE ME BUTTON + MODAL
// =============================================
const hireBtn = document.getElementById('hire-btn');
const modalOverlay = document.getElementById('modal-overlay');
const modalClose = document.getElementById('modal-close');
const hireSendBtn = document.getElementById('hire-send-btn');
const hireStatus = document.getElementById('hire-status');

hireBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modalOverlay.classList.add('active');
});

modalClose.addEventListener('click', () => {
    modalOverlay.classList.remove('active');
    hireStatus.className = 'form-status';
    hireStatus.textContent = '';
});

modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
        hireStatus.className = 'form-status';
        hireStatus.textContent = '';
    }
});

hireSendBtn.addEventListener('click', () => {
    const name = document.getElementById('hire-name').value.trim();
    const email = document.getElementById('hire-email').value.trim();
    const message = document.getElementById('hire-message').value.trim();

    if (!name || !email || !message) {
        hireStatus.className = 'form-status error';
        hireStatus.textContent = 'Please fill in all fields before sending.';
        return;
    }

    const emailBody = `
Hire Request from Portfolio

Name: ${name}
Email: ${email}

Message:
${message}
    `;

    hireSendBtn.textContent = 'Sending...';
    hireSendBtn.disabled = true;

    Email.send({
        SecureToken: "YOUR_SMTP_SECURE_TOKEN", // Replace with your SMTP.js secure token
        To: "vickydawa47@gmail.com",
        From: "vickydawa47@gmail.com",
        Subject: `Hire Request from ${name}`,
        Body: emailBody
    }).then(result => {
        hireSendBtn.textContent = 'Send Request';
        hireSendBtn.disabled = false;
        if (result === "OK") {
            hireStatus.className = 'form-status success';
            hireStatus.textContent = '✅ Your hire request was sent successfully! I\'ll get back to you soon.';
            document.getElementById('hire-name').value = '';
            document.getElementById('hire-email').value = '';
            document.getElementById('hire-message').value = '';
        } else {
            hireStatus.className = 'form-status error';
            hireStatus.textContent = '❌ Something went wrong. Please try emailing vickydawa47@gmail.com directly.';
        }
    }).catch(() => {
        hireSendBtn.textContent = 'Send Request';
        hireSendBtn.disabled = false;
        hireStatus.className = 'form-status error';
        hireStatus.textContent = '❌ Failed to send. Please email vickydawa47@gmail.com directly.';
    });
});


// =============================================
//  CONTACT FORM
// =============================================
const sendBtn = document.getElementById('send-btn');
const formStatus = document.getElementById('form-status');

function showError(id, show) {
    const el = document.getElementById(id);
    if (el) el.style.display = show ? 'block' : 'none';
}

sendBtn.addEventListener('click', () => {
    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const phone   = document.getElementById('phone').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validate
    let hasError = false;
    showError('name-error',    !name);    if (!name)    hasError = true;
    showError('email-error',   !email);   if (!email)   hasError = true;
    showError('phone-error',   !phone);   if (!phone)   hasError = true;
    showError('subject-error', !subject); if (!subject) hasError = true;
    showError('message-error', !message); if (!message) hasError = true;

    if (hasError) return;

    const emailBody = `
New Contact Form Message

Name:    ${name}
Email:   ${email}
Phone:   ${phone}
Subject: ${subject}

Message:
${message}
    `;

    sendBtn.textContent = 'Sending...';
    sendBtn.disabled = true;

    Email.send({
        SecureToken: "YOUR_SMTP_SECURE_TOKEN", // Replace with your SMTP.js secure token
        To: "vickydawa47@gmail.com",
        From: "vickydawa47@gmail.com",
        Subject: `Portfolio Contact: ${subject}`,
        Body: emailBody
    }).then(result => {
        sendBtn.textContent = 'Send Message';
        sendBtn.disabled = false;
        if (result === "OK") {
            formStatus.className = 'form-status success';
            formStatus.textContent = '✅ Message sent successfully! I\'ll get back to you soon.';
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('phone').value = '';
            document.getElementById('subject').value = '';
            document.getElementById('message').value = '';
        } else {
            formStatus.className = 'form-status error';
            formStatus.textContent = '❌ Something went wrong. Please email vickydawa47@gmail.com directly.';
        }
    }).catch(() => {
        sendBtn.textContent = 'Send Message';
        sendBtn.disabled = false;
        formStatus.className = 'form-status error';
        formStatus.textContent = '❌ Failed to send. Please email vickydawa47@gmail.com directly.';
    });
});