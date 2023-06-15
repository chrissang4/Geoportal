//initializing the map to Kenya
var map = L.map('map').setView([0.0236, 37.9062], 6);


//Adding osm Tile layer to map
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//Adding Google base maps
var googleStreets = L.tileLayer('http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
}).addTo(map);


var googleHybrid = L.tileLayer('http://{s}.google.com/vt?lyrs=s,h&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
}).addTo(map);


var googleSat = L.tileLayer('http://{s}.google.com/vt?lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
}).addTo(map);

var googleTerrain = L.tileLayer('http://{s}.google.com/vt?lyrs=p&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
}).addTo(map);




//Adding markers to map
//var marker = L.marker([0.0236, 37.9062]).addTo(map);


//Adding stylings to AOI Layer
var AOIStyle = {
  color : "red", 
  opacity : "20%",
  weight : "1.5"
}

//Adding stylings to Hospital Layer
var HospitalsStyle = {
    radius:8,
    fillColor:"green",
    color:"green",
    weight:1,
}

//Adding stylings to Road Layer
var RoadStyle = {
    color : "grey", 
    opacity : "20%",
    weight : "1.5"
  }

//Adding GeoJson Layers
var A0I = L.geoJson(AOI, {
    style: AOIStyle,
    onEachFeature: function (feature, layer) {
        area = (turf.area(feature) / 1000000).toFixed(3);
        center_lng = turf.center(feature).geometry.coordinates[0].toFixed(3);
        center_lat = turf.center(feature).geometry.coordinates[1].toFixed(3);

        label = `Name: ${feature.properties.constituen}<br>`;
        label += `Area: ${area}<br>`;
        label += `Center: Lng: ${center_lng}, Lat: ${center_lat}<br>`;
        layer.bindPopup(label);
    }
}).addTo(map);

       

//})//.addTo(map)

var Hospitals = L.geoJson(Hospital,{
    pointToLayer:function(feature, latlng) {
        return L.circleMarker(latlng,HospitalsStyle);
        
         
     

    }}).addTo(map)

var Railway = L.geoJson(Railway).addTo(map)

var Rangeland = L.geoJson(Rangeland).addTo(map)

var Road = L.geoJson(Road
).addTo(map)


//Adding WMS layers on the map




//Adding controls to the map
var baseLayers = {
    "OpenStreetMap": osm,
    "Google Street": googleStreets,
    "Google Hybrid Map": googleHybrid,
    "Google satellite": googleSat,
    "Google Terrain": googleTerrain,
};
//layers
var overlays = {
   "County": A0I ,
    "Health Facilities": Hospitals,
    "Railway Lines": Railway,
    "Range": Rangeland,
    "Roads": Road,

};
//Adding layer control to map
L.control.layers(baseLayers, overlays,{collapsed:false}).addTo(map);

//Adding leaflet browser print
L.control.browserPrint({position: 'topleft'}).addTo(map);

//mouse move coordinate
map.on("mousemove",function(e) {
    console.log(e)
    $("#coordinate").html(`Lat:${e.latlng.lat.toFixed(3)}, Lng:${e.latlng.lng.toFixed(3)}`)
})







//Adding scale tp map
L.control.scale().addTo(map)
