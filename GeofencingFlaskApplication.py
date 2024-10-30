from flask import Flask, request, jsonify, render_template, send_from_directory
import geopy.distance
from datetime import datetime
import json
import os

app = Flask(__name__)

# Configuration
class Config:
    GEOFENCE_CENTER = (34.0522, -118.2437)  # Default: Los Angeles
    GEOFENCE_RADIUS = 100  # meters
    HISTORY_FILE = "location_history.json"

# Geofence checking
class GeofenceManager:
    def __init__(self):
        self.center = Config.GEOFENCE_CENTER
        self.radius = Config.GEOFENCE_RADIUS
    
    def check_location(self, location):
        try:
            distance = geopy.distance.distance(self.center, location).meters
            return {
                "within_fence": distance <= self.radius,
                "distance": round(distance, 2)
            }
        except Exception as e:
            return {
                "within_fence": False,
                "distance": 0,
                "error": str(e)
            }

# Initialize manager
geofence_manager = GeofenceManager()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/static/<path:filename>')
def serve_static(filename):
    return send_from_directory('static', filename)

@app.route('/check_location', methods=['POST'])
def check_location():
    try:
        data = request.json
        user_location = (float(data['latitude']), float(data['longitude']))
        result = geofence_manager.check_location(user_location)
        
        return jsonify({
            'status': 'success',
            'result': result
        })
    
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 400

if __name__ == '__main__':
    app.run(debug=True)