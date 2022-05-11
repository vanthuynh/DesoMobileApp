
from flask import Flask, redirect, url_for, request, jsonify
from flask_cors import CORS, cross_origin
from urllib import response
from tinydb import TinyDB, Query
import json

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# create db.json file for storing geofence data
db = TinyDB('geoDB.json')

# create tables with specific name and initialize them
MACTable = db.table('MAC')
ERUTable = db.table('ERU')
MEATable = db.table('MEA')
dropCoordinatesTable = db.table('drop_coordinates')
evacuationCoordinatesTable = db.table('evacuation_coordinates')
searchAreaTable = db.table('search_area_coordinates')
homeLocationTable = db.table('home_coordinates')

# create an instance of Query class that can help us search the database
query = Query()

def is_empty(result):
    return True if len(result)==0 else False
def is_correct_coordinates_format(obj):
    if not is_empty(obj):
        # lat = -90 to 90
        # lng = -180 to 180
        if (isinstance(obj["lat"], float)) or (isinstance(obj["lat"], int)):
            if not (-90 <= obj["lat"] <= 90):
                raise Exception("ERROR: Latitude not valid")
        else:
            raise Exception("ERROR: Latitude not a float")

        if isinstance(obj["lng"], float) or isinstance(obj["lng"], int):
            if not (-180 <= obj["lng"] <= 180):
                raise Exception("ERROR: Longitude not valid")
        else:
            raise Exception("ERROR: Longitude not a float")
        return True
    return False
'''
SUBMIT ALL: clear all data and add new submitted data
DELETE ALL: clear all data and leave it be
'''
@app.route('/postGeofence/<vehicle_name>', methods=['POST'])
def submit_geofence(vehicle_name):
    response_object = {'status': 'success'}
    if request.method == 'POST':
        geoData = request.get_json(force=True)
        if vehicle_name == 'MAC':
            MACTable.truncate()
            MACTable.insert(geoData)
        elif vehicle_name == 'ERU':
            ERUTable.truncate()
            ERUTable.insert(geoData)
        elif vehicle_name == 'MEA':
            MEATable.truncate()
            MEATable.insert(geoData)
        response_object['message'] = 'data added!'
    return jsonify(response_object)

@app.route('/getGeofence/<vehicle_name>', methods=['GET'])
def get_geofence(vehicle_name):
    result={}
    if vehicle_name == 'MAC':
        result = MACTable.all()
    elif vehicle_name == 'ERU':
        result = ERUTable.all()
    elif vehicle_name == 'MEA':
        result = MEATable.all()
    return jsonify(result[0]['geofence']) if not is_empty(result) else jsonify([])

@app.route('/gcs/geofence/<vehicle_id>', methods=['DELETE'])
def remove_geofence(vehicle_id):
    if(vehicle_id == 'MAC'):
        MACTable.truncate()
    elif(vehicle_id == 'ERU'):
        ERUTable.truncate()
    elif(vehicle_id == 'MEA'):
        MEATable.truncate()
    else: pass
    return "DELETE SUCCESS"

@app.route('/postERUDropLocation', methods=['POST'])
def post_drop_location():
    response_object = {'status': 'success'}
    drop_coordinates = request.get_json(force=True)
    if is_correct_coordinates_format(drop_coordinates):
        dropCoordinatesTable.truncate()
        dropCoordinatesTable.insert(drop_coordinates)
        response_object['message'] = 'data added!'
    return jsonify(response_object)

@app.route('/postEvacuationZone', methods=['POST'])
def post_evacuation_zone():
    response_object = {'status': 'success'}
    evac_coordinates = request.get_json(force=True)
    if is_correct_coordinates_format(evac_coordinates):
        evacuationCoordinatesTable.truncate()
        evacuationCoordinatesTable.insert(evac_coordinates)
        response_object['message'] = 'data added!'
    return jsonify(response_object)

# return drop location for MAC and evacuation zone for MEA and ERU
@app.route('/getMissionWaypoint/<vehicle_name>', methods=['GET'])
def get_mission_waypoint(vehicle_name):
    result={}
    if request.method == 'GET':
        if(vehicle_name == 'MAC'):
            result = dropCoordinatesTable.all()
        elif(vehicle_name == 'MEA' or vehicle_name == 'ERU'):
            result = evacuationCoordinatesTable.all()
        else: pass
    return jsonify(result[0]) if not is_empty(result) else jsonify({})

# each vechicle has its own home location
@app.route('/postHomeCoordinates/<vehicle_name>', methods=['POST'])
def post_home_location(vehicle_name):
    response_object = {'status': 'success'}
    home_coordinates = request.get_json(force=True)
    if is_correct_coordinates_format(home_coordinates):
        if(vehicle_name == 'MAC'):
            homeLocationTable.upsert(home_coordinates, query.vehicle=='MAC')
        elif(vehicle_name == 'ERU'):
            homeLocationTable.upsert(home_coordinates, query.vehicle=='ERU')
        elif(vehicle_name == 'MEA'):
            homeLocationTable.upsert(home_coordinates, query.vehicle=='MEA')
        else: pass
        response_object['message'] = 'data added!'
    return jsonify(response_object)

# each vehicle has its own home location
@app.route('/getHomeCoordinates/<vehicle_name>', methods=['GET'])
def get_home_location(vehicle_name):
    result={}
    if request.method == 'GET':
        if(vehicle_name == 'MAC'):
            result=homeLocationTable.search(query.vehicle == 'MAC')
        elif(vehicle_name == 'ERU'):
            result=homeLocationTable.search(query.vehicle == 'ERU')
        elif(vehicle_name == 'MEA'):
            result=homeLocationTable.search(query.vehicle == 'MEA')
        else: pass
    return jsonify(result[0]) if not is_empty(result) else jsonify({})

@app.route('/postSearchArea', methods=['POST'])
def post_search_area():
    response_object = {'status': 'success'}
    if request.method == 'POST':
        search_area_coordinates = request.get_json(force=True)
        searchAreaTable.truncate()
        searchAreaTable.insert(search_area_coordinates)
        response_object['message'] = 'data added!'
    return jsonify(response_object)

@app.route('/getSearchArea', methods=['GET'])
def get_search_area():
    result={}
    if request.method == 'GET':
        result = searchAreaTable.all()
    return jsonify(result[0]["search_area"]) if not is_empty(result) else jsonify([])

####### Uncommend to completely remove all tables and run again
# db.drop_table('MAC')
# db.drop_table('ERU')
# db.drop_table('MEA')
# db.drop_table('drop_coordinates')
# db.drop_table('evacuation_coordinates')
# db.drop_table('search_area_coordinates')
# db.drop_table('home_coordinates')
####### Uncomment below to empty out all tablesand run again
# MACTable.truncate()
# ERUTable.truncate()
# MEATable.truncate()
# dropCoordinatesTable.truncate()
# evacuationCoordinatesTable.truncate()
# searchAreaTable.truncate()
# homeLocationTable.truncate()


# the host value allows traffic from anywhere to run this
app.run(host = "0.0.0.0")