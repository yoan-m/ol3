goog.provide('ol.renderer.cesium.ImageryProvider');

goog.require('ol.TileCoord');
goog.require('ol.source.ImageTileSource');



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
  //TODO for some reason these functions are being stripped out even with
  //the exports file. Need to revisit for correct fix.
  this.hack_ = {
    isReady: this.isReady,
    tileWidth: this.getTileWidth,
    tileHeight: this.getTileHeight,
    maximumLevel: this.getMaximumLevel,
    tileDiscardPolicy: this.getTileDiscardPolicy,
    errorEvent: this.getErrorEvent,
    logo: this.getLogo,
    requestImage: this.requestImage
  };
  /**
   * @private
   * @type {Cesium.Event}
   */
  this.event_ = new Cesium.Event();
};
goog.inherits(ol.renderer.cesium.ImageryProvider, Cesium.ImageryProvider);


/**
 * @return {boolean} True if the source is ready to use; otherwise, false.
 */
ol.renderer.cesium.ImageryProvider.prototype.isReady = function() {
  return this.source_.isReady();
};


/**
 * @return {Cesium.Extent} The extent.
 */
ol.renderer.cesium.ImageryProvider.prototype.getExtent = function() {
  return this.getTilingScheme().getExtent();
};


/**
 * @return {number} The width.
 */
ol.renderer.cesium.ImageryProvider.prototype.getTileWidth = function() {
  // TODO this is wrong
  return 256;
};


/**
 * @return {number} The height.
 */
ol.renderer.cesium.ImageryProvider.prototype.getTileHeight = function() {
  // TODO the is wrong too
  return 256;
};


/**
 * @return {number} The maximum level, or undefined if there is
 * no maximum level.
 */
ol.renderer.cesium.ImageryProvider.prototype.getMaximumLevel = function() {
  // TODO this is probably wrong too
  return this.source_.getResolutions().length;
};


/**
 *  // TODO change return type
 *  @return {Cesium.WebMercatorTilingScheme} The tiling scheme.
 */
ol.renderer.cesium.ImageryProvider.prototype.getTilingScheme = function() {
  // TODO figure out mapping between projections and tiling schemes
  //var code = this.source_.getProjection().getCode();
  return new Cesium.WebMercatorTilingScheme();
};


/**
 * // TODO change return type
 * @return {undefined} The discard policy.
 */
ol.renderer.cesium.ImageryProvider.prototype.getTileDiscardPolicy = function() {
  // TODO
  return undefined;
};


/**
 * @return {Cesium.Event} The event.
 */
ol.renderer.cesium.ImageryProvider.prototype.getErrorEvent = function() {
  return this.event_;
};


/**
 * @return {HTMLImageElement|HTMLCanvasElement|undefined} A canvas or
 * image containing the log to display, or undefined if there is no logo.
 */
ol.renderer.cesium.ImageryProvider.prototype.getLogo = function() {
  // TODO
  return undefined;
};


/**
 * @param {number} x The tile x coordinate.
 * @param {number} y The tile y coordinate.
 * @param {number} level The tile level.
 * @return {Object|undefined} A promise for the image that will resolve
 * when the image is available, or undefined if there are too many active
 * requests to the server, and the request should be retried later.
 * The resolved image may be either an Image or a Canvas DOM object.
 */
ol.renderer.cesium.ImageryProvider.prototype.requestImage =
    function(x, y, level) {
  var tileGrid = this.source_.getTileGrid();
  var projection = this.source_.getProjection();
  if (goog.isNull(tileGrid)) {
    tileGrid = ol.tilegrid.getForProjection(projection);
  }
  var coord = new ol.TileCoord(level, x, -y - 1);
  var tile = this.source_.getTile(coord.z,coord.x, coord.y, tileGrid,
          projection);
  if (typeof tile !== 'undefined' && typeof tile.getKey() !== 'undefined') {
    return Cesium.ImageryProvider.loadImage(tile.getKey());
  }
  return undefined;
};

