function sendEmail() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    const mailtoLink = `mailto:thejayaram4567@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\nMessage: ${message}`)}`;

    // Create a temporary form
    const tempForm = document.createElement("form");
    tempForm.setAttribute("action", mailtoLink);
    tempForm.setAttribute("method", "POST");
    tempForm.setAttribute("target", "emailFrame"); // Target the hidden iframe
    document.body.appendChild(tempForm);

    // Submit the form to open email client
    tempForm.submit();

    // Clean up
    document.body.removeChild(tempForm);
}


function selectRoom(roomType, roomPrice) {
        document.getElementById('room-type').value = roomType;
        document.getElementById('room-price').value = '₹ ' + roomPrice;
        document.getElementById('booking-form-modal').style.display = 'block';
    }

    function closeForm() {
        document.getElementById('booking-form-modal').style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == document.getElementById('booking-form-modal')) {
            closeForm();
        }
    }

    function submitBooking(event) {
        event.preventDefault();
        const form = document.getElementById('booking-form');
        const formData = new FormData(form);

        fetch('/submit-booking', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            alert('Booking confirmed! Check your email for details.');
            closeForm();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while booking. Please try again.');
        });
    }

function closeConfirmation() {
    document.getElementById('confirmation-modal').style.display = 'none';
}

function submitBooking(event) {
    event.preventDefault();
    const form = document.getElementById('booking-form');
    const formData = new FormData(form);

    fetch('/submit-booking', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('booking-form-modal').style.display = 'none';
        document.getElementById('confirmation-modal').style.display = 'block';
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Successfully Booked.');
    });
}

window.onclick = function(event) {
    if (event.target == document.getElementById('booking-form-modal')) {
        closeForm();
    } else if (event.target == document.getElementById('confirmation-modal')) {
        closeConfirmation();
    }
}
