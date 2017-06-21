L.mapbox.accessToken = 'pk.eyJ1Ijoia2Vpa3JldXRsZXIiLCJhIjoiMWRKNGkwTSJ9.6fwMqvOqGXqAJeH-yF__DQ';
var map = L.mapbox.map('map', 'keikreutler.m1fd5843', { //keikreutler.mgpknpdp', {
    zoomControl: true,
    minZoom: 2
}).setView([ 53.094, 11.338], 3);

map.scrollWheelZoom.disable();

/******************
CREATE LAYER GROUPS
******************/

var cubesats = new L.layerGroup();
var communications = new L.layerGroup();
var assorted_bright = new L.layerGroup();
var weather = new L.layerGroup();
var geodetic = new L.layerGroup();
var scientific = new L.layerGroup();
var engineering = new L.layerGroup();
var space_stations = new L.layerGroup();
var education = new L.layerGroup();

var oct042014 = new L.layerGroup();
var oct042015 = new L.layerGroup();
var jun262015 = new L.layerGroup();
var jun262016 = new L.layerGroup();

var categories = {
        "CubeSats": cubesats,
        "Communications": communications,
        "Assorted Bright": assorted_bright,
        "Weather": weather,
        "Geodetic": geodetic,
        "Scientific": scientific,
        "Space Stations": space_stations,
        "Engineering": engineering,
        "Education": education
    }

var dates = {"Sat Oct 04 00:00:00 GMT+01:00 2014": oct042014, "Sun Oct 04 00:00:00 GMT+01:00 2015": oct042015, "Fri Jun 26 00:00:00 GMT+01:00 2015": jun262015, "Sun Jun 26 00:00:00 GMT+01:00 2016": jun262016};

/******************
LOAD MAP DATA
******************/

/*** ASSIGN MARKER TYPES ***/

$.getJSON("/data/satellites.geojson", function(data) {
    L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng, {
                radius: 5,
                fillColor: "#FFF",
                color: "#FFF",
                weight: 10,
                opacity: .5,
                fillOpacity: 0.8
            });
        },
        onEachFeature: createPopUps
        }).on('click', function(e) {
            e.layer.openPopup();
        });
    });


function createPopUps(feature, featureLayer) {
    featureLayer.bindPopup('<h1>' + feature.properties.Name + '</h1><p><strong>Type: </strong>' + feature.properties.Category + '</p><p><strong>Owner: </strong>' + feature.properties.Owner + '</p><p><strong>Launch site: </strong>' + feature.properties["Launch Site"] + '</p><h3><a data-target="#' + feature.id +'" data-toggle="modal">Biography</h3>');
    categories[feature.properties.Category].addLayer(featureLayer);
    dates[feature.properties.Date].addLayer(featureLayer);
}


jun262015.addTo(map);
