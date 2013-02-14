goog.require('goog.debug.Console');
goog.require('goog.debug.Logger');
goog.require('goog.debug.Logger.Level');
goog.require('ol.Collection');
goog.require('ol.Coordinate');
goog.require('ol.Map');
goog.require('ol.View2D');
goog.require('ol.layer.TileLayer');
goog.require('ol.source.MapQuestOpenAerial');


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
  view: view,
  renderer: ol.RendererHint.WEBGL
});
var cesium = new ol.Map({
  layers: new ol.Collection([layer]),
  target: 'cesium',
  view: view,
  renderer: ol.RendererHint.CESIUM
});
