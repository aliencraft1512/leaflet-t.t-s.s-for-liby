// Code goes here
var circle
var marker
var data;
 var lat= 32.8;
  var lon=13;
 // var rad= 50000;

var mymap = L.map('mapid').setView([28, 18], 5);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 8,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: "pk.eyJ1IjoiYWx0YXdlcmdoaSIsImEiOiJjanBiMGdlenUwczdmM3VzYjk3cTF3cWEwIn0.vhrrOp4mg4JheUaSrR5wgQ"
	}).addTo(mymap);

//var canvas;
 function setup() {
   Tabletop.init( {
       //key:"1VlvRAQ9xn8byyMHTxqSUzIOfj29L6BnGcNJHEAHtbqY",// arabic
      key:"1ahipXBCnFrJzzREvYW-PJ-BYp7W5hVebVXwqBXlPE8M",
        // key:"1nKEO14fOgMYdJ1F_tFN8QPOCPYhSTmfYaR-KG3od84k",
          callback:gotdata,
          simpleSheet: true
    
  });
 
 // createCanvas(500,400);
 // background(0);
//  button = createButton('show circle');
 // button.position(50, 400);
//  button.mousePressed(changeBG);
  }

function gotdata(stuff, tabletop) { 
           data= stuff;
      // console.log(data);
 // L.geoJSON(data).addTo(mymap);
 // console.log(data);
  
  var myLayer = L.geoJSON().addTo(mymap);
myLayer.addData(data);
  
 // console.log(myLayer);
  
  var myLines = [{
    "type": "LineString",
    "coordinates": [[32.8, 13.2], [31.8, 20], [30.8, 16.5]]
}, {
    "type": "LineString",
    "coordinates": [[31.8, 12.2], [32.8, 20], [29.8, 16.2]]
}];
var myStyle = {
    "color": "#ff7800",
    "weight": 5,
    "opacity": 0.65
};

L.geoJSON(myLines, {
    style: myStyle
}).addTo(mymap);
  
  
  
}
function showdata(){
var text = "";
for (i = 0 ; i < data.length ; i++) {
 text+=(data[i].City) +" Latitude is "+ (data[i].Latitude) +" and Longitudeis "+ (data[i].Longitude) +"_population of _ "+ (data[i].population)+ "<br>";
 document.getElementById("demo").innerHTML = text;
  
var city_population=sqrt(data[i].population)*100;
var cityname=data[i].City;
 ///////
  var circle = L.circle([data[i].Latitude,data[i].Longitude], {
    color: (10, 255, 10, 50),
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: city_population
}).addTo(layerGroup);
 circle.bindPopup(cityname).openPopup();
}}
var layerGroup = L.layerGroup().addTo(mymap);
var markerArray=[];
mymap.on('click',function(e){
	var poplocation=e.latlng;
	var marker=L.marker([e.latlng.lat,e.latlng.lng]).addTo(mymap);
	marker.addTo(layerGroup);
  var coordinates=[marker.getLatLng().lat,marker.getLatLng().lng];
	markerArray.push(coordinates);
	drawLine(markerArray);
	});
function show_capital(){
   layerGroup.clearLayers();
 
   circle = L.circle([lat,lon], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: rad
}).addTo(layerGroup);
 circle.bindPopup("This is Tripoli").openPopup();
}  
function drawLine(marray){
var polyline=L.polyline(marray,{color:'red'}).addTo(mymap);
polyline.addTo(layerGroup);
}
//var latlngs=[
//[32.5,21.5],
//[30,19.5],
//[18.5,20.5]
//]
//var polyline=L.polyline(latlngs,{color:'red'}).addTo(mymap);
function testFunction1(){
  layerGroup.clearLayers();
  mymap.closePopup();
  marker = L.marker([32.8,13]).addTo(layerGroup);
  marker.bindPopup("musa Salem").openPopup();
}
function testFunction2(){
  layerGroup.clearLayers();
  mymap.closePopup();
  marker = L.marker([31.8,20.2]).addTo(layerGroup);
  marker.bindPopup("Maher").openPopup();
}

//num.replace(/,(?=.*\.\d+)/g, '');
function population(){
 layerGroup.clearLayers();
for (i = 0 ; i < data.length ; i++) {
var poplation =data[i].population;
var cityname=data[i].City;
 var city_population=sqrt(poplation)*100;///////
  var circle = L.circle([data[i].Latitude,data[i].Longitude], {
    color: (127,255,212, 50),
    fillColor: '#7FFFD4',
    fillOpacity: 0.6,
    radius: city_population
}).addTo(layerGroup);
 circle.bindPopup(cityname+ '</br>'+"عدد السكان "+poplation+" نسمة ").openPopup();
 // circle.bindPopup(poplation).openPopup();
  
 // console.log(data);
}}
function population_proper(){
 layerGroup.clearLayers();
for (i = 0 ; i < data.length ; i++) {
var population_proper =data[i].population_proper;
var cityname=data[i].City;
 var city_population=sqrt(population_proper)*100;///////
  var circle = L.circle([data[i].Latitude,data[i].Longitude], {
    color: (238,130,238, 50),
    fillColor: '	#EE82EE',
    fillOpacity: 0.5,
    radius: city_population
}).addTo(layerGroup);
 circle.bindPopup(cityname+ '</br>'+"عدد السكان "+population_proper+" نسمة ").openPopup();
 // console.log(data);
}}

var baseLayers = {
		"Cities": layerGroup
		//"Streets": streets
	};


var overlays = {
		"Cities": layerGroup
	};

	L.control.layers( baseLayers,overlays).addTo(mymap);








