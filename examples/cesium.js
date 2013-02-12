goog.require('goog.debug.Console');
goog.require('goog.debug.Logger');
goog.require('goog.debug.Logger.Level');
goog.require('ol.Cesium');
goog.require('ol.Collection');
goog.require('ol.Coordinate');
goog.require('ol.Map');
goog.require('ol.View2D');
goog.require('ol.layer.TileLayer');
goog.require('ol.source.MapQuestOpenAerial');




/*
 * Set up OpenLayers 3 map.
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
var cesium = new ol.Cesium({
  layers: new ol.Collection([layer]),
  target: 'cesium',
  view: view
});
