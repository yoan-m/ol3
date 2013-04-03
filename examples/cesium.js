goog.require('ol.Coordinate');
goog.require('ol.Map');
goog.require('ol.RendererHint');
goog.require('ol.View2D');
goog.require('ol.View3D');
goog.require('ol.layer.TileLayer');
goog.require('ol.source.MapQuestOpenAerial');


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

var map = new ol.Map({
  layers: [
    new ol.layer.TileLayer({
      source: new ol.source.MapQuestOpenAerial()
    })
  ],
  renderer: ol.RendererHint.WEBGL,
  target: 'ol3',
  view: new ol.View2D({
    center: new ol.Coordinate(0, 0),
    zoom: 1
  })
});
var cesium = new ol.Map({
  target: 'cesium',
  renderer: ol.RendererHint.CESIUM
});

cesium.bindTo('layers', map);
cesium.bindTo('view', map);
