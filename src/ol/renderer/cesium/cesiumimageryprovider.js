goog.provide('ol.renderer.cesium.ImageryProvider');

goog.require('ol.TileCoord');

/**
 * @constructor
 * @extends {Cesium.ImageryProvider}
 * @param {ol.source.ImageTileSource} source The tile image source.
 */
ol.renderer.cesium.ImageryProvider = function(source) {
  /**
   * @private
   * @type {ol.source.ImageTileSource}
   */
  this.source_ = source;
  
  /**
   * @private
   * @type {Cesium.Event}
   */
  this.event_ = new Cesium.Event();
};
goog.inherits(ol.renderer.cesium.ImageryProvider, Cesium.ImageryProvider);

/**
 * @return {boolean}
 */
ol.renderer.cesium.ImageryProvider.prototype.isReady = function() {
  return this.source_.isReady();
};

/**
 * @return {Cesium.Extent}
 */
ol.renderer.cesium.ImageryProvider.prototype.getExtent = function() {
  return this.getTilingScheme().getExtent();
};

/**
 * @return {number}
 */
ol.renderer.cesium.ImageryProvider.prototype.getTileWidth = function() {
  // TODO this is wrong
  return 256;
};

/**
 * @return {number}
 */
ol.renderer.cesium.ImageryProvider.prototype.getTileHeight = function() {
  // TODO the is wrong too
  return 256;
};

/**
 * @return {number}
 */
ol.renderer.cesium.ImageryProvider.prototype.getMaximumLevel = function() {
  // TODO this is probably wrong too
  return this.source_.getResolutions().length;
};

/**
 *  // TODO change return type
 *  //@return {Cesium.GeographicTilingScheme}
 *  @return {Cesium.WebMercatorTilingScheme}
 */
ol.renderer.cesium.ImageryProvider.prototype.getTilingScheme = function() {
  // TODO figure out mapping between projections and tiling schemes
  //var code = this.source_.getProjection().getCode();
  //return new Cesium.GeographicTilingScheme();
  return new Cesium.WebMercatorTilingScheme();
};

/**
 * // TODO change return type
 * @return {undefined}
 */
ol.renderer.cesium.ImageryProvider.prototype.getTileDiscardPolicy = function() {
  // TODO
  return undefined;
};

/**
 * @return {Cesium.Event}
 */
ol.renderer.cesium.ImageryProvider.prototype.getErrorEvent = function() {
  return this.event_;
};

/**
 * // TODO change return type
 * @return {HTMLImageElement|HTMLCanvasElement|undefined}
 */
ol.renderer.cesium.ImageryProvider.prototype.getLogo = function() {
  // TODO
  return undefined;
};

/**
 * @param {number} x
 * @param {number} y
 * @param {number} level
 * @return {Object|undefined}
 */
ol.renderer.cesium.ImageryProvider.prototype.requestImage = function(x, y, level) {
  var url = this.source_.getTileCoordUrl(new ol.TileCoord(level, x, -y - 1));
  if (typeof url !== 'undefined') {
	  return Cesium.ImageryProvider.loadImage(url);
  }
  return undefined;
};

