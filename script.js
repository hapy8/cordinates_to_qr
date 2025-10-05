document.getElementById('coord-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const lat = parseFloat(document.getElementById('latitude').value);
    const lng = parseFloat(document.getElementById('longitude').value);

    // Validate coordinates
    if (isNaN(lat) || isNaN(lng)) {
        alert('Please enter valid numbers for latitude and longitude.');
        return;
    }

    if (lat < -90 || lat > 90) {
        alert('Latitude must be between -90 and 90.');
        return;
    }

    if (lng < -180 || lng > 180) {
        alert('Longitude must be between -180 and 180.');
        return;
    }

    // Create Google Maps URL
    const mapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;

    // Clear previous QR code
    const qrContainer = document.getElementById('qrcode');
    qrContainer.innerHTML = '';

    // Generate new QR code
    new QRCode(qrContainer, {
        text: mapsUrl,
        width: 256,
        height: 256,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
    });

    // Show QR container
    document.getElementById('qr-container').classList.add('show');
    document.getElementById('qr-text').textContent = 'Scan this QR code to view the location on Google Maps.';
});