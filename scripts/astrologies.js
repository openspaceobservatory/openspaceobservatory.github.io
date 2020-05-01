L.mapbox.accessToken = 'pk.eyJ1Ijoia2Vpa3JldXRsZXIiLCJhIjoiMWRKNGkwTSJ9.6fwMqvOqGXqAJeH-yF__DQ';
var map1 = L.mapbox.map('map-astrology-1', '', {
    zoomControl: false,
    minZoom: 1,
    tileLayer: {
        // this map option disables world wrapping. by default, it is false.
        continuousWorld: false,
        // this option disables loading tiles outside of the world bounds.
        noWrap: true
    }
}).setView([ 40.094, 11.338], 1);

var map2 = L.mapbox.map('map-astrology-3', '', {
    zoomControl: false,
    minZoom: 1,
    tileLayer: {
        // this map option disables world wrapping. by default, it is false.
        continuousWorld: false,
        // this option disables loading tiles outside of the world bounds.
        noWrap: true
    }
}).setView([ 40.094, 11.338], 1);

var map3 = L.mapbox.map('map-astrology-3', '', {
    zoomControl: false,
    minZoom: 1,
    tileLayer: {
        // this map option disables world wrapping. by default, it is false.
        continuousWorld: false,
        // this option disables loading tiles outside of the world bounds.
        noWrap: true
    }
}).setView([ 40.094, 11.338], 1);

map1.scrollWheelZoom.disable();
map2.scrollWheelZoom.disable();
map3.scrollWheelZoom.disable();


/******************
CREATE LAYER GROUPS
******************/
var oct042014 = new L.layerGroup();
var oct042015 = new L.layerGroup();
var jun262015 = new L.layerGroup();
var jun262016 = new L.layerGroup();

var emptyArray = [];

var constellation_oct042014 = L.polyline(emptyArray, 
    {
        color: '#88bac3',
        weight: 2,
        opacity: .5,
        smoothFactor: 10
    });
var constellation_oct042015 = L.polyline(emptyArray, 
    {
        color: '#88bac3',
        weight: 2, //2
        opacity: .5, //1
        smoothFactor: 10
    });
var constellation_jun262015 = L.polyline(emptyArray,
    {
        color: '#88bac3',
        weight: 2, //2
        opacity: .5, //1
        smoothFactor: 10
    });
var constellation_jun262016 = L.polyline(emptyArray,
    {
        color: '#000',//'#88bac3',
        weight: 2,
        opacity: .5,
        smoothFactor: 10
    });

var dates = {"Sat Oct 04 00:00:00 GMT+01:00 2014": oct042014, "Sun Oct 04 00:00:00 GMT+01:00 2015": oct042015, "Fri Jun 26 00:00:00 GMT+01:00 2015": jun262015, "Sun Jun 26 00:00:00 GMT+01:00 2016": jun262016};

var constellations = {"Sat Oct 04 00:00:00 GMT+01:00 2014": constellation_oct042014, "Sun Oct 04 00:00:00 GMT+01:00 2015": constellation_oct042015, "Fri Jun 26 00:00:00 GMT+01:00 2015": constellation_jun262015, "Sun Jun 26 00:00:00 GMT+01:00 2016": constellation_jun262016}


/******************
LOAD MAP DATA
******************/

/*** ASSIGN MARKER TYPES ***/

$.getJSON("/data/satellites.geojson", function(data) {
    L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
            if (feature.properties.Date == 'Fri Jun 26 00:00:00 GMT+01:00 2015') {
                constellations[feature.properties.Date].addLatLng(latlng);
                return L.circleMarker(latlng, {
                    radius: 3,
                    fillColor: "#88bac3",
                    color: "#88bac3",
                    weight: 1,
                    opacity: 0,
                    fillOpacity: 1
                })
            }
            if ((feature.properties.Date === 'Sat Oct 04 00:00:00 GMT+01:00 2014') && (feature.properties.Category === 'CubeSats')) {
                constellations[feature.properties.Date].addLatLng(latlng);
                return L.circleMarker(latlng, {
                    radius: 3,
                    fillColor: "#88bac3",
                    color: "#88bac3",
                    weight: 1,
                    opacity: 0,
                    fillOpacity: 1
                })
            }
            if (feature.properties.Date === "Sun Oct 04 00:00:00 GMT+01:00 2015") {
                if ((feature.properties.Name === "PICARD") || (feature.properties.Name === "IBEX") || (feature.properties.Name === "SPEKTR-R")) {
                    constellations[feature.properties.Date].addLatLng(latlng);
                    return L.circleMarker(latlng, {
                        radius: 3,
                        fillColor: "#88bac3",
                        color: "#88bac3",
                        weight: 1,
                        opacity: 0,
                        fillOpacity: 1
                    })
                }
            }
            if (feature.properties.Date === 'Sun Jun 26 00:00:00 GMT+01:00 2016') {
                constellations[feature.properties.Date].addLatLng(latlng);
                 return L.circleMarker(latlng, {
                    radius: 3,
                    fillColor: "#88bac3",
                    color: "#88bac3",
                    weight: 1,
                    opacity: 0,
                    fillOpacity: 1
                })
            }
            else {
                return L.circleMarker(latlng, {
                    radius: 3,
                    fillColor: "#000",
                    color: "#000",
                    weight: 8,
                    opacity: .3,
                    fillOpacity: 1
                });
            }

        },
        onEachFeature: createPopUps
        }).on('click', function(e) {
            e.layer.openPopup();
        });
    });

function createPopUps(feature, featureLayer) {
    featureLayer.bindPopup('<a data-target="#' + feature.id +'" data-toggle="modal"><h1>' + feature.properties.Name + '</h1></a>');
    dates[feature.properties.Date].addLayer(featureLayer);
}

constellations["Sun Oct 04 00:00:00 GMT+01:00 2015"].addLatLng([52.71, -65.18]);

for(var key in dates) {
    dates[key].addLayer(constellations[key]);
}

jun262015.addTo(map1);
