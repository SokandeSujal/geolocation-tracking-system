// Navigation
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    navToggle?.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Map Configuration
const DEFAULT_LOCATION = { lat: 34.0522, lng: -118.2437 }; // Los Angeles
const GEOFENCE_RADIUS = 100; // meters

let marker, watchId, svg, geofenceCircle;

function initMap() {
    const mapContainer = document.getElementById('map');
    const svgNamespace = "http://www.w3.org/2000/svg";
    
    svg = document.createElementNS(svgNamespace, "svg");
    svg.setAttribute("viewBox", "-200 -200 400 400");
    svg.style.width = "100%";
    svg.style.height = "100%";
    
    // Create geofence circle
    geofenceCircle = document.createElementNS(svgNamespace, "circle");
    geofenceCircle.setAttribute("cx", "0");
    geofenceCircle.setAttribute("cy", "0");
    geofenceCircle.setAttribute("r", GEOFENCE_RADIUS);
    geofenceCircle.setAttribute("fill", "rgba(74, 222, 128, 0.1)");
    geofenceCircle.setAttribute("stroke", "#4ade80");
    
    // Create location marker
    marker = document.createElementNS(svgNamespace, "circle");
    marker.setAttribute("cx", "0");
    marker.setAttribute("cy", "0");
    marker.setAttribute("r", "5");
    marker.setAttribute("fill", "#4ade80");
    
    svg.appendChild(geofenceCircle);
    svg.appendChild(marker);
    mapContainer.appendChild(svg);
    
    addScaleIndicator(svg); // Add distance scale indicator
    addDirectionIndicators(svg); // Add cardinal direction indicators
    
    startLocationTracking();
}

// Convert coordinates to SVG coordinates
function coordsToSVG(lat, lng) {
    const centerLat = DEFAULT_LOCATION.lat;
    const centerLng = DEFAULT_LOCATION.lng;
    
    // Convert to relative coordinates
    const x = (lng - centerLng) * 10000; // Scale factor
    const y = -(lat - centerLat) * 10000; // Scale factor
    
    return { x, y };
}

// Update marker position
function updateMarkerPosition(lat, lng) {
    const coords = coordsToSVG(lat, lng);
    marker.setAttribute("cx", coords.x);
    marker.setAttribute("cy", coords.y);
}

// Location Tracking
function startLocationTracking() {
    if (navigator.geolocation) {
        watchId = navigator.geolocation.watchPosition(
            handleLocationUpdate,
            handleLocationError,
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
        );
    } else {
        showNotification('Geolocation is not supported by this browser.', 'error');
    }
}

function handleLocationUpdate(position) {
    const currentLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
    };

    updateMarkerPosition(currentLocation.lat, currentLocation.lng);
    
    // Check geofence
    const distance = Math.sqrt(
        Math.pow((currentLocation.lng - DEFAULT_LOCATION.lng), 2) +
        Math.pow((currentLocation.lat - DEFAULT_LOCATION.lat), 2)
    ) * 111000; // Approximate conversion to meters

    updateStatus(distance <= GEOFENCE_RADIUS);
    updateLocationHistory(currentLocation, distance <= GEOFENCE_RADIUS);
    sendLocationUpdate(currentLocation);
}

function handleLocationError(error) {
    const errorMessages = {
        1: "Location access denied. Please enable location services.",
        2: "Location information unavailable.",
        3: "Location request timed out.",
        0: "An unknown error occurred."
    };
    showNotification(errorMessages[error.code] || errorMessages[0], 'error');
}

// UI Updates
function updateStatus(isWithinGeofence) {
    const statusText = document.getElementById('status-text');
    if (typeof isWithinGeofence === 'boolean') {
        statusText.innerHTML = isWithinGeofence ? 
            '<span class="status-safe">✓ Within safe zone</span>' : 
            '<span class="status-warning">⚠ Outside safe zone</span>';
    } else {
        statusText.innerHTML = `<span class="status-error">${isWithinGeofence}</span>`;
    }
}

function updateLocationHistory(location, isWithinGeofence) {
    const historyContainer = document.getElementById('location-history');
    const time = new Date().toLocaleTimeString();
    
    const historyItem = document.createElement('div');
    historyItem.className = `history-item animate-fade`;
    historyItem.innerHTML = `
        <span class="time">${time}</span>
        <span class="status ${isWithinGeofence ? 'status-safe' : 'status-warning'}">
            ${isWithinGeofence ? '✓' : '⚠'}
        </span>
    `;
    
    historyContainer.insertBefore(historyItem, historyContainer.firstChild);
    
    // Keep only last 10 entries
    while (historyContainer.children.length > 10) {
        historyContainer.removeChild(historyContainer.lastChild);
    }
}

// Notifications
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Contact Form
function initContactForm() {
    const form = document.getElementById('contact-form');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitButton = form.querySelector('.submit-button');
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="animate-spin">↻</span> Sending...';
        
        try {
            // Simulate form submission
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            form.reset();
            showNotification('Message sent successfully!', 'success');
        } catch (error) {
            showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        }
    });
}

// Scroll to Top
function initScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-top';
    scrollBtn.innerHTML = '↑';
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Distance Scale Indicator
function addScaleIndicator(svg) {
    const scale = document.createElementNS("http://www.w3.org/2000/svg", "line");
    scale.setAttribute("x1", "-50");
    scale.setAttribute("y1", "180");
    scale.setAttribute("x2", "50");
    scale.setAttribute("y2", "180");
    scale.setAttribute("stroke", "#000");
    scale.setAttribute("stroke-width", "2");
    
    const scaleText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    scaleText.setAttribute("x", "0");
    scaleText.setAttribute("y", "170");
    scaleText.setAttribute("text-anchor", "middle");
    scaleText.textContent = "100m";
    
    svg.appendChild(scale);
    svg.appendChild(scaleText);
}

// Cardinal Direction Indicators
function addDirectionIndicators(svg) {
    const directions = [
        { text: "N", x: 0, y: -190 },
        { text: "S", x: 0, y: 190 },
        { text: "E", x: 190, y: 0 },
        { text: "W", x: -190, y: 0 }
    ];
    
    directions.forEach(dir => {
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", dir.x);
        text.setAttribute("y", dir.y);
        text.setAttribute("text-anchor", "middle");
        text.textContent = dir.text;
        svg.appendChild(text);
    });
}

// New location checking functionality
document.addEventListener('DOMContentLoaded', () => {
    const latitudeInput = document.getElementById('latitude');
    const longitudeInput = document.getElementById('longitude');
    const checkButton = document.getElementById('check-location');
    const useCurrentButton = document.getElementById('use-current-location');
    const currentLocation = document.getElementById('current-location');
    const statusText = document.getElementById('status-text');
    const locationInfo = document.getElementById('location-info');

    checkButton.addEventListener('click', () => {
        const lat = parseFloat(latitudeInput.value);
        const lng = parseFloat(longitudeInput.value);
        
        if (isNaN(lat) || isNaN(lng)) {
            alert('Please enter valid coordinates');
            return;
        }
        
        updateMarkerPosition(lat, lng);
        
        // Check location
        const distance = Math.sqrt(
            Math.pow((lng - DEFAULT_LOCATION.lng), 2) +
            Math.pow((lat - DEFAULT_LOCATION.lat), 2)
        ) * 111000; // Approximate conversion to meters

        statusText.innerHTML = distance <= GEOFENCE_RADIUS ? 
            '<span class="status-safe">✓ Within geofence</span>' : 
            '<span class="status-warning">⚠ Outside geofence</span>';

        locationInfo.innerHTML = `
            <p>Latitude: ${lat}</p>
            <p>Longitude: ${lng}</p>
            <p>Distance from center: ${distance.toFixed(2)} meters</p>
        `;
    });

    useCurrentButton.addEventListener('click', () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    latitudeInput.value = lat;
                    longitudeInput.value = lng;
                    updateMarkerPosition(lat, lng);
                },
                (error) => {
                    alert('Error getting location: ' + error.message);
                }
            );
        } else {
            alert('Geolocation is not supported by this browser');
        }
    });
});

// Initialize everything when the page loads
window.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initContactForm();
    initScrollToTop();
    initMap(); // Initialize the SVG-based map
});

// Clean up when page is hidden
document.addEventListener('visibilitychange', () => {
    if (document.hidden && watchId) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
    } else if (!document.hidden && !watchId) {
        startLocationTracking();
    }
});
