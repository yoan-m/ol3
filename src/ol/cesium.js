goog.provide('ol.Cesium');
goog.provide('ol.CesiumProperty');

goog.require('goog.debug.Logger');

/**
 * @enum {string}
 */
ol.CesiumProperty = {
  BACKGROUND_COLOR: 'backgroundColor',
  LAYERS: 'layers',
  SIZE: 'size',
  VIEW: 'view'
};

/**
 * @constructor
 * @extends {ol.Object}
 * @param {ol.CesiumOptions} cesiumOptions Cesium options.
 */
ol.Cesium = function(cesiumOptions) {

  goog.base(this);

  if (goog.DEBUG) {
    /**
     * @protected
     * @type {goog.debug.Logger}
     */
    this.logger = goog.debug.Logger.getLogger('ol.cesium.' + goog.getUid(this));
  }
  
  var cesiumOptionsInternal = ol.Cesium.createOptionsInternal(cesiumOptions);
  
  /**
   * @private
   * @type {Element}
   */
  this.target_ = cesiumOptionsInternal.target;
  
  
  //TODO should this be an option param?
  var imageryUrl = 'cesium/Source/Assets/Textures/';
  var canvas = document.createElement('canvas');
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  // Prevent right-click from opening a context menu.
  canvas.oncontextmenu = function () {
      return false;
  };
  goog.dom.appendChild(this.target_, canvas);
  var ellipsoid = Cesium.Ellipsoid.WGS84;
  var scene = new Cesium.Scene(canvas);
  var primitives = scene.getPrimitives();

  
  //TODO change this
  var imageryProvider = new Cesium.SingleTileImageryProvider({
      url : imageryUrl + 'NE2_LR_LC_SR_W_DR_2048.jpg'
  });

  var cb = new Cesium.CentralBody(ellipsoid);
  cb.getImageryLayers().addImageryProvider(imageryProvider);
  primitives.setCentralBody(cb);
  //TODO turn on/off skyAtmosphere and skybox as options?
  scene.skyAtmosphere = new Cesium.SkyAtmosphere();
  scene.skyBox = new Cesium.SkyBox({
      positiveX: imageryUrl + 'SkyBox/tycho8_px_80.jpg',
      negativeX: imageryUrl + 'SkyBox/tycho8_mx_80.jpg',
      positiveY: imageryUrl + 'SkyBox/tycho8_py_80.jpg',
      negativeY: imageryUrl + 'SkyBox/tycho8_my_80.jpg',
      positiveZ: imageryUrl + 'SkyBox/tycho8_pz_80.jpg',
      negativeZ: imageryUrl + 'SkyBox/tycho8_mz_80.jpg'
  });
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
  
  function animate() {
	  // INSERT CODE HERE to update primitives based on changes to
	  // animation time, camera parameters, etc.
	  
	  updateOpenLayersView();
	}
  
  function tick() {
	  scene.initializeFrame();
	  animate();
	  scene.render();
	  Cesium.requestAnimationFrame(tick);
	}
	tick();
	
	/*
	 * View/Camera synchronization.
	 */
	var view = cesiumOptionsInternal.values[ol.CesiumProperty.VIEW];
	var TILE_SIZE = 256.0;

	var projection = new Cesium.WebMercatorProjection(ellipsoid);
	var camera = scene.getCamera();

	function updateOpenLayersView() {
	  if (typeof camera === 'undefined') {
	    return;
	  }

	  var positionCart = new Cesium.Cartographic(0.0, 0.0, 0.0);
	  ellipsoid.cartesianToCartographic(camera.position, positionCart);
	  var position = projection.project(positionCart);
	  view.setCenter(new ol.Coordinate(position.x, position.y));
	  
	  view.setResolution(positionCart.height / TILE_SIZE);
	}

	function updateCesiumCamera() {
	  var center = view.getCenter();

	  var positionCart = projection.unproject(center);
	  positionCart.longitude = Cesium.Math.clamp(
	      positionCart.longitude, -Math.PI, Math.PI);
	  positionCart.latitude = Cesium.Math.clamp(
	      positionCart.latitude, -Cesium.Math.PI_OVER_TWO, Cesium.Math.PI_OVER_TWO);
	  positionCart.height = view.getResolution() * TILE_SIZE;
	  ellipsoid.cartographicToCartesian(positionCart, camera.position);

	  Cesium.Cartesian3.negate(camera.position, camera.direction);
	  Cesium.Cartesian3.normalize(camera.direction, camera.direction);
	  Cesium.Cartesian3.cross(camera.direction, Cesium.Cartesian3.UNIT_Z,
	      camera.right);
	  Cesium.Cartesian3.cross(camera.right, camera.direction, camera.up);
	  
	  var angle = view.getRotation();
	  var rotation = Cesium.Matrix3.fromQuaternion(
	      Cesium.Quaternion.fromAxisAngle(camera.direction, angle));
	  Cesium.Matrix3.multiplyByVector(rotation, camera.up, camera.up);
	  Cesium.Cartesian3.cross(camera.direction, camera.up, camera.right);
	}
	
	view.addEventListener('center_changed', function() {
	  updateCesiumCamera();
	});
	view.addEventListener('resolution_changed', function() {
	  updateCesiumCamera();
	});
	view.addEventListener('rotation_changed', function() {
	  updateCesiumCamera();
	});
	
	
	
	this.setValues(cesiumOptionsInternal.values);
	
};
goog.inherits(ol.Cesium, ol.Object);


/**
 * @return {ol.Color|undefined} Background color.
 */
ol.Cesium.prototype.getBackgroundColor = function() {
  return /** @type {ol.Color|undefined} */ (
      this.get(ol.CesiumProperty.BACKGROUND_COLOR));
};
goog.exportProperty(
    ol.Cesium.prototype,
    'getBackgroundColor',
    ol.Cesium.prototype.getBackgroundColor);

/**
 * @return {ol.Size|undefined} Size.
 */
ol.Cesium.prototype.getSize = function() {
  return /** @type {ol.Size|undefined} */ (this.get(ol.CesiumProperty.SIZE));
};
goog.exportProperty(
    ol.Cesium.prototype,
    'getSize',
    ol.Cesium.prototype.getSize);

/**
 * @return {ol.View} View.
 */
ol.Cesium.prototype.getView = function() {
  return /** @type {ol.View} */ (this.get(ol.CesiumProperty.VIEW));
};
goog.exportProperty(
    ol.Cesium.prototype,
    'getView',
    ol.Cesium.prototype.getView);

/**
 * @param {ol.IView} view View.
 */
ol.Cesium.prototype.setView = function(view) {
  this.set(ol.CesiumProperty.VIEW, view);
};
goog.exportProperty(
    ol.Cesium.prototype,
    'setView',
    ol.Cesium.prototype.setView);

/**
 * @return {boolean} Is defined.
 */
ol.Cesium.prototype.isDef = function() {
  var view = this.getView();
  return goog.isDef(view) && view.isDef() &&
      goog.isDefAndNotNull(this.getSize());
};

/**
 * @typedef {{
 *            target: Element,
 *            values: Object.<string, *>}}
 */
ol.CesiumOptionsInternal;


/**
 * @param {ol.CesiumOptions} cesiumOptions Cesium options.
 * @return {ol.CesiumOptionsInternal} Cesium options.
 */
ol.Cesium.createOptionsInternal = function(cesiumOptions) {
	  /**
	   * @type {Object.<string, *>}
	   */
	  var values = {};
	  values[ol.CesiumProperty.LAYERS] = goog.isDef(cesiumOptions.layers) ?
			  cesiumOptions.layers : new ol.Collection();
	  values[ol.CesiumProperty.VIEW] = goog.isDef(cesiumOptions.view) ?
		      cesiumOptions.view : new ol.View2D();
	  
	  /**
	   * @type {Element}
	   */
	  var target = goog.dom.getElement(cesiumOptions.target);

	  return {
	    target: target,
	    values: values
	  };

};