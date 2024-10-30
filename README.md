# Geolocation Tracking System

A web-based application that tracks the user's location and displays it on an interactive SVG map. The system provides geofencing capabilities to determine if the user is within a specified safe zone, along with a contact form for user inquiries.

## Features

- **Interactive SVG Map**: Visual representation of the user's location and a geofence.
- **Geolocation Tracking**: Continuously tracks the user's position using the browser's geolocation API.
- **Geofencing**: Alerts users whether they are within a predefined safe zone.
- **Location History**: Keeps track of recent location updates with timestamps.
- **Notifications**: Provides real-time feedback for actions and errors (e.g., form submissions, location access).
- **Mobile-Friendly**: Responsive design with a toggleable navigation menu.
- **Contact Form**: Allows users to send inquiries, with confirmation notifications.

## Technologies Used

- HTML
- CSS
- JavaScript
- SVG (for the map)

## Getting Started

### Prerequisites

- A modern web browser that supports the Geolocation API.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/geolocation-tracking.git
   ```

2. Navigate to the project directory:

   ```bash
   cd geolocation-tracking
   ```

3. Open `index.html` in your web browser.

## Usage

- Upon loading, the application will request permission to access your location.
- Your location will be displayed on the map, and you will receive updates on whether you are within the geofenced area.
- You can input coordinates manually to check their status relative to the geofence.
- Use the contact form to send messages or inquiries.

## Customization

- Update the `DEFAULT_LOCATION` variable in the JavaScript to change the center of the geofence.
- Adjust `GEOFENCE_RADIUS` to increase or decrease the safe zone radius.

## Contributions

Contributions are welcome! Please submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Acknowledgements

- Thanks to the contributors and libraries that make web development easier.
- Inspired by various geolocation and mapping tutorials.
