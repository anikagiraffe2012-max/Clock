const canvas = document.getElementById('clockCanvas');
const ctx = canvas.getContext('2d');
const radius = canvas.width / 2 - 10;

function degToRad(degrees) {
    return degrees * (Math.PI / 180);
}

function drawClockFace(){
    ctx.clearRect(0,0, canvas.width, canvas.height);

    // Outer rim
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#2c2c3e';
    ctx.lineWidth = 12;
    ctx.stroke();

    // Inner face (ADDED)
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, radius - 6, 0, 2 * Math.PI);
    ctx.fillStyle = '#fdf6e3';
    ctx.fill();
    ctx.strokeStyle = '#aaa';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Center dot
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 6, 0, 2 * Math.PI);
    ctx.fillStyle = '#2c2c3e';
    ctx.fill();
    ctx.strokeStyle = '#fdf6e3';
    ctx.lineWidth = 2;
    ctx.stroke();
}

function drawHourMarkers() {
    for (let hour = 1; hour <= 12; hour++) {
        const angle = degToRad(hour * 30 - 90);
        
        const markerLength = 15;
        const innerX = canvas.width / 2 + Math.cos(angle) * (radius - markerLength);
        const innerY = canvas.height / 2 + Math.sin(angle) * (radius - markerLength);
        const outerX = canvas.width / 2 + Math.cos(angle) * radius;
        const outerY = canvas.height / 2 + Math.sin(angle) * radius;

        ctx.beginPath();
        ctx.moveTo(innerX, innerY);
        ctx.lineTo(outerX, outerY);
        ctx.strokeStyle = '#333';
        ctx.lineWidth = hour % 3 === 0 ? 4 : 2;
        ctx.stroke();

        const textRadius = radius - 25;
        const textX = canvas.width / 2 + Math.cos(angle) * textRadius;
        const textY = canvas.height / 2 + Math.sin(angle) * textRadius;
        
        ctx.font = 'bold 16px "Segoe UI", Arial, sans-serif';
        ctx.fillStyle = '#2c2c3e';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(hour.toString(), textX, textY);
    }
}

function drawHand(angle, length, width, color) {
    const endX = canvas.width / 2 + Math.cos(angle) * length;
    const endY = canvas.height / 2 + Math.sin(angle) * length;

    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.stroke();   // ✅ FIXED TYPO
}

function updateClock() {
    const now = new Date();

    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const secAngle = degToRad(seconds * 6 - 90);
    const minAngle = degToRad(minutes * 6 + seconds * 0.1 - 90);
    const hourAngle = degToRad((hours % 12) * 30 + minutes * 0.5 - 90);

    drawClockFace();
    drawHourMarkers();

    drawHand(hourAngle, radius * 0.5, 8, '#1a1a2e');
    drawHand(minAngle, radius * 0.7, 5, '#2c2c3e');
    drawHand(secAngle, radius * 0.85, 2, '#c0392b');  

    // Redraw center dot on top of hands
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 6, 0, 2 * Math.PI);
    ctx.fillStyle = '#2c2c3e';
    ctx.fill();
    ctx.strokeStyle = '#fdf6e3';
    ctx.lineWidth = 2;
    ctx.stroke();
}

updateClock();
setInterval(updateClock, 1000);
