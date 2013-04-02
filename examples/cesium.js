goog.require('goog.debug.Console');
goog.require('goog.debug.Logger');
goog.require('goog.debug.Logger.Level');
goog.require('ol.Collection');
goog.require('ol.Coordinate');
goog.require('ol.Map');
goog.require('ol.View3D');
goog.require('ol.View2D');
goog.require('ol.layer.TileLayer');
goog.require('ol.source.MapQuestOpenAerial');


var layer = new ol.layer.TileLayer({
  source: new ol.source.MapQuestOpenAerial()
});
/*var view = new ol.View3D({
  center: new ol.Coordinate(26415645.342789244, 0, 0),
  direction : new ol.Coordinate(-1, 0, 0),
  up : new ol.Coordinate(0, 0, 1),
  right : new ol.Coordinate(0, 1, 0),
  zoom: 1
});
var cesium = new ol.Map({
    layers: new ol.Collection([layer]),
    target: 'cesium',
    view : view,
    renderer: ol.RendererHint.CESIUM
  });

var map = new ol.Map({
  target: 'ol3',
  renderer: ol.RendererHint.WEBGL
});


map.bindTo('layers', cesium);
map.bindTo('view', cesium)*/

var view = new ol.View2D({
  center: new ol.Coordinate(0, 0),
  zoom: 1
});
var map = new ol.Map({
  layers: new ol.Collection([layer]),
  target: 'ol3',
  view: view,
  renderer: ol.RendererHint.WEBGL
});
var cesium = new ol.Map({
  target: 'cesium',
  renderer: ol.RendererHint.CESIUM
});

cesium.bindTo('layers', map);
cesium.bindTo('view', map)

