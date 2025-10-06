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

    // Get QR code colors based on theme
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const qrDark = isDark ? '#ffffff' : '#000000';
    const qrLight = isDark ? '#000000' : '#ffffff';

    // Generate new QR code
    new QRCode(qrContainer, {
        text: mapsUrl,
        width: 256,
        height: 256,
        colorDark: qrDark,
        colorLight: qrLight,
        correctLevel: QRCode.CorrectLevel.H
    });

    // Show QR container
    document.getElementById('qr-container').classList.add('show');
    document.getElementById('qr-text').textContent = 'Scan this QR code to view the location on Google Maps.';
});

// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'light';

document.documentElement.setAttribute('data-theme', currentTheme);
themeToggle.textContent = currentTheme === 'dark' ? '☀️' : '🌙';

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
});