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
- Python (for hosting)

## Getting Started

### Prerequisites

- Python 3.x installed on your system.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/SokandeSujal/geolocation-tracking-system.git
   ```

2. Navigate to the project directory:

   ```bash
   cd geolocation-tracking
   ```

3. Run the following Python code to start the server:

   ```bash
   python -m http.server
   ```

4. After running the command, you will see output similar to the following, indicating the URL where the application is hosted:

   ```
   Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ...
   ```

5. Open your web browser and navigate to the provided URL (e.g., `http://localhost:8000` or `http://your_ip_address:8000`).

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
