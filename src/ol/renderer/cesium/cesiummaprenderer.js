goog.provide('ol.renderer.cesium.Map');

goog.require('goog.debug.Logger');
goog.require('goog.dom');
goog.require('goog.dom.TagName');
goog.require('ol.layer.TileLayer');
goog.require('ol.renderer.Map');
goog.require('ol.renderer.cesium.Layer');



/**
 * @constructor
 * @extends {ol.renderer.Map}
 * @param {Element} container Container.
 * @param {ol.Map} map Map.
 */
ol.renderer.cesium.Map = function(container, map) {
  goog.base(this, container, map);

  if (goog.DEBUG) {
    /**
     * @inheritDoc
     */
    this.logger = goog.debug.Logger.getLogger(
        'ol.renderer.cesium.map.' + goog.getUid(this));
  }

  /**
   * @private
   * @type {Element}
   */
  this.canvas_ = goog.dom.createElement(goog.dom.TagName.CANVAS);
  this.canvas_.height = container.clientHeight;
  this.canvas_.width = container.clientWidth;
  this.canvas_.className = 'ol-unselectable';
  this.canvas_.oncontextmenu = function() {
    return false;
  };
  goog.dom.insertChildAt(container, this.canvas_, 0);

  /**
   * @private
   * @type {Cesium.Scene}
   */
  this.scene_ = new Cesium.Scene(this.canvas_);

  var ellipsoid = Cesium.Ellipsoid.WGS84;
  var cb = new Cesium.CentralBody(ellipsoid);
  this.scene_.getPrimitives().setCentralBody(cb);

  this.scene_._screenSpaceCameraController =
      this.scene_._screenSpaceCameraController &&
      this.scene_._screenSpaceCameraController.destroy();
  this.scene_._screenSpaceCameraController = {
    update: function() {}
  };

  var that = this;
  function updateCesiumCamera() {
    var view = that.getMap().getView();
    if (typeof view === 'undefined') {
      return;
    }
    view = view.getView3D();
    var center = view.getCenter();
    var direction = view.getDirection();
    var up = view.getUp();
    var right = view.getRight();
    var camera = that.scene_.getCamera();

    Cesium.Cartesian3.clone(center, camera.position);
    Cesium.Cartesian3.clone(direction, camera.direction);
    Cesium.Cartesian3.clone(up, camera.up);
    Cesium.Cartesian3.clone(right, camera.right);
  }

  function tick() {
    that.scene_.initializeFrame();
    updateCesiumCamera();
    that.scene_.render();
    Cesium.requestAnimationFrame(tick);
  }
  tick();
};
goog.inherits(ol.renderer.cesium.Map, ol.renderer.Map);


/**
 * @inheritDoc
 */
ol.renderer.cesium.Map.prototype.addLayer = function(layer) {
  var layerRenderer = this.createLayerRenderer(layer);
  this.setLayerRenderer(layer, layerRenderer);

  var cb = this.scene_.getPrimitives().getCentralBody();
  cb.getImageryLayers().add(layerRenderer.getImageryLayer());
};


/**
 * @inheritDoc
 */
ol.renderer.cesium.Map.prototype.removeLayer = function(layer) {
  var cb = this.scene_.getPrimitives().getCentralBody();
  var layerRenderer = this.removeLayerRenderer(layer);
  cb.getImageryLayers().remove(layerRenderer.getImageryLayer(), false);

  goog.dispose(layerRenderer);
};


/**
 * @inheritDoc
 */
ol.renderer.cesium.Map.prototype.getCanvas = function() {
  return this.canvas_;
};


/**
 * @return {Cesium.Scene} Cesium's scene.
 */
ol.renderer.cesium.Map.prototype.getScene = function() {
  return this.scene_;
};


/**
 * @inheritDoc
 */
ol.renderer.cesium.Map.prototype.createLayerRenderer = function(layer) {
  if (layer instanceof ol.layer.TileLayer) {
    return new ol.renderer.cesium.Layer(this, layer);
  } else {
    goog.asserts.assert(false);
    return null;
  }
};


/**
 * @inheritDoc
 */
ol.renderer.cesium.Map.prototype.renderFrame = function(frameState) {
  if (!goog.isNull(frameState)) {
    this.calculateMatrices2D(frameState);
  }
};


/**
 * @inheritDoc
 */
ol.renderer.cesium.Map.prototype.disposeInternal = function() {
  this.scene_ = this.scene_ && this.scene_.destroy();
  goog.base(this, 'disposeInternal');
};
