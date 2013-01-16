goog.require('goog.debug.Console');
goog.require('goog.debug.Logger');
goog.require('goog.debug.Logger.Level');
goog.require('ol.Collection');
goog.require('ol.Coordinate');
goog.require('ol.Map');
goog.require('ol.View2D');
goog.require('ol.layer.TileLayer');
goog.require('ol.source.MapQuestOpenAerial');


/*
 * Cesium
 */

var canvas = document.createElement('canvas');
canvas.style.width = '100%';
canvas.style.height = '100%';
document.getElementById('cesium').appendChild(canvas);
var ellipsoid = Cesium.Ellipsoid.WGS84;
var scene = new Cesium.Scene(canvas);
var primitives = scene.getPrimitives();

var imageryUrl = 'cesium/Source/Assets/Textures/';
var imageryProvider = new Cesium.SingleTileImageryProvider({
    url : imageryUrl + 'NE2_LR_LC_SR_W_DR_2048.jpg'
});

var cb = new Cesium.CentralBody(ellipsoid);
cb.getImageryLayers().addImageryProvider(imageryProvider);
primitives.setCentralBody(cb);
scene.skyAtmosphere = new Cesium.SkyAtmosphere();
scene.skyBox = new Cesium.SkyBox({
    positiveX: imageryUrl + 'SkyBox/tycho8_px_80.jpg',
    negativeX: imageryUrl + 'SkyBox/tycho8_mx_80.jpg',
    positiveY: imageryUrl + 'SkyBox/tycho8_py_80.jpg',
    negativeY: imageryUrl + 'SkyBox/tycho8_my_80.jpg',
    positiveZ: imageryUrl + 'SkyBox/tycho8_pz_80.jpg',
    negativeZ: imageryUrl + 'SkyBox/tycho8_mz_80.jpg'
});

function animate() {
    // INSERT CODE HERE to update primitives based on changes to
    // animation time, camera parameters, etc.
}

function tick() {
  scene.initializeFrame();
  animate();
  scene.render();
  Cesium.requestAnimationFrame(tick);
}
tick();

var onResize = function () {
  var width = canvas.clientWidth;
  var height = canvas.clientHeight;
  if (canvas.width === width && canvas.height === height) {
    return;
  }
  canvas.width = width;
  canvas.height = height;
  scene.getCamera().frustum.aspectRatio = width / height;
};
window.addEventListener('resize', onResize, false);
onResize();

/*
 * OpenLayers
 */

var layer = new ol.layer.TileLayer({
  source: new ol.source.MapQuestOpenAerial()
});
var view = new ol.View2D({
  center: new ol.Coordinate(0, 0),
  zoom: 1
});
var map = new ol.Map({
  layers: new ol.Collection([layer]),
  target: 'ol3',
  view: view
});
view.addEventListener('center_changed', function() {
  window.console.log('center changed');
});
view.addEventListener('resolution_changed', function() {
  window.console.log('resolution changed');
});
view.addEventListener('rotation_changed', function() {
  window.console.log('rotation changed');
});
