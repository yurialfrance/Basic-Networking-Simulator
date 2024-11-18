let currentMode = 'straight'; // Default mode is Straight-Through
const straightThrough = [
    "orange-white", "orange", "green-white", "blue",
    "blue-white", "green", "brown-white", "brown"
];
const crossOver = [
    "green-white", "green", "orange-white", "blue",
    "blue-white", "orange", "brown-white", "brown"
];

// Dynamically create 8 pins for each connector
function createPins(connectorId) {
    const pinsContainer = document.querySelector(`#${connectorId} .pins`);
    for (let i = 0; i < 8; i++) {
        const pin = document.createElement('div');
        pin.classList.add('pin');
        pin.setAttribute('data-pin', i + 1);
        pinsContainer.appendChild(pin);
    }
}

createPins('connector1');
createPins('connector2');

// Enable dragging for colors
document.querySelectorAll('.color').forEach(color => {
    color.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('color', color.getAttribute('data-color'));
    });
});

// Allow dropping on pins
document.querySelectorAll('.pin').forEach(pin => {
    pin.addEventListener('dragover', (e) => e.preventDefault());
    pin.addEventListener('drop', (e) => {
        e.preventDefault();
        const droppedColor = e.dataTransfer.getData('color');
        pin.setAttribute('data-color', droppedColor);
        pin.style.backgroundColor = getColorStyle(droppedColor);
    });

    pin.addEventListener('dblclick', () => {
        // Reset pin on double click
        pin.removeAttribute('data-color');
        pin.style.backgroundColor = '#fff';
    });
});

// Map colors to their styles
function getColorStyle(color) {
    const colorMap = {
        "orange": "orange",
        "orange-white": "#ffe4b5",
        "green": "green",
        "green-white": "#ccffcc",
        "blue": "blue",
        "blue-white": "#add8e6",
        "brown": "brown",
        "brown-white": "#d2b48c"
    };
    return colorMap[color];
}

// Test connection
document.getElementById('testConnection').addEventListener('click', () => {
    const connector1 = Array.from(
        document.querySelectorAll('#connector1 .pin')
    ).map(pin => pin.getAttribute('data-color') || null);

    const connector2 = Array.from(
        document.querySelectorAll('#connector2 .pin')
    ).map(pin => pin.getAttribute('data-color') || null);

    let resultMessage = "Incorrect Wiring!";
    if (currentMode === 'straight' &&
        JSON.stringify(connector1) === JSON.stringify(straightThrough) &&
        JSON.stringify(connector2) === JSON.stringify(straightThrough)) {
        resultMessage = "Straight-Through Connected!";
    } else if (currentMode === 'crossover' &&
        JSON.stringify(connector1) === JSON.stringify(straightThrough) &&
        JSON.stringify(connector2) === JSON.stringify(crossOver)) {
        resultMessage = "Cross-Over Connected!";
    }

    document.getElementById('result').textContent = resultMessage;
});

// Switch mode
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentMode = tab.getAttribute('data-mode');
    });
});

// Set initial active tab
document.getElementById('straightTab').classList.add('active');
