var Cesium = {};



/**
 * @constructor
 */
Cesium.Camera = function() {};


/**
 * @type {Cesium.Cartesian3}
 */
Cesium.Camera.prototype.direction;


/**
 * @type {Cesium.PerspectiveFrustrum}
 */
Cesium.Camera.prototype.frustum;


/**
 * @return {Cesium.CameraControllerCollection}
 */
Cesium.Camera.prototype.getControllers = function() {};


/**
 * @type {Cesium.Cartesian3}
 */
Cesium.Camera.prototype.position;


/**
 * @type {Cesium.Cartesian3}
 */
Cesium.Camera.prototype.right;


/**
 * @type {Cesium.Matrix4}
 */
Cesium.Camera.prototype.transform;


/**
 * @type {Cesium.Cartesian3}
 */
Cesium.Camera.prototype.up;



/**
 * @constructor
 */
Cesium.CameraControllerCollection = function() {};


/**
 */
Cesium.CameraControllerCollection.prototype.addSpindle = function() {};


/**
 */
Cesium.CameraControllerCollection.prototype.addFreeLook = function() {};



/**
 * @constructor
 * @param {number} x
 * @param {number} y
 * @param {number} z
 */
Cesium.Cartesian3 = function(x, y, z) {};



/**
 * @constructor
 * @param {Cesium.Ellipsoid} ellipsoid
 */
Cesium.CentralBody = function(ellipsoid) {};


/**
 * @return {Cesium.ImageryLayerCollection}
 */
Cesium.CentralBody.prototype.getImageryLayers = function() {};


/**
 * @type {boolean}
 */
Cesium.CentralBody.prototype.showBumps;


/**
 * @type {boolean}
 */
Cesium.CentralBody.prototype.showClouds;


/**
 * @type {boolean}
 */
Cesium.CentralBody.prototype.showCloudShadows;


/**
 * @type {boolean}
 */
Cesium.CentralBody.prototype.showDay;


/**
 * @type {boolean}
 */
Cesium.CentralBody.prototype.showNight;


/**
 * @type {boolean}
 */
Cesium.CentralBody.prototype.showTerminator;



/**
 * @constructor
 */
Cesium.CompositePrimitive = function() {};


/**
 * @param {Cesium.CentralBody} centralBody
 */
Cesium.CompositePrimitive.prototype.setCentralBody =
    function(centralBody) {};



/**
 * @constructor
 */
Cesium.Context = function() {};


/**
 * @constructor
 */
Cesium.ImageryLayerCollection = function() {};


/**
 * @param {Cesium.ImageryProvider} provider
 */
Cesium.ImageryLayerCollection.prototype.addImageryProvider =
    function(provider) {};



/**
 * @constructor
 */
Cesium.ImageryProvider = function() {};



/**
 * @constructor
 * @param {Cesium.Cartesian3} radii
 */
Cesium.Ellipsoid = function(radii) {};


/**
 * @type {Cesium.Ellipsoid}
 */
Cesium.Ellipsoid.WGS84;



/**
 * @constructor
 */
Cesium.Matrix4 = function() {};



/**
 * @constructor
 * @param {Object} options
 */
Cesium.OpenStreetMapTileProvider = function(options) {};



/**
 * @constructor
 */
Cesium.PerspectiveFrustrum = function() {};


/**
 * @type {number}
 */
Cesium.PerspectiveFrustrum.prototype.aspectRatio;


/**
 * @type {number}
 */
Cesium.PerspectiveFrustrum.prototype.far;


/**
 * @type {number}
 */
Cesium.PerspectiveFrustrum.prototype.fovy;


/**
 * @type {number}
 */
Cesium.PerspectiveFrustrum.prototype.near;



/**
 * @constructor
 */
Cesium.Primitive = function() {};



/**
 * @constructor
 * @param {HTMLCanvasElement|Element} canvas
 */
Cesium.Scene = function(canvas) {};


/**
 * @return {Cesium.Camera}
 */
Cesium.Scene.prototype.getCamera = function() {};


/**
 * @return {HTMLCanvasElement}
 */
Cesium.Scene.prototype.getCanvas = function() {};


/**
 * @return {WebGLRenderingContext}
 */
Cesium.Scene.prototype.getContext = function() {};


/**
 * @return {Cesium.CompositePrimitive}
 */
Cesium.Scene.prototype.getPrimitives = function() {};


/**
 */
Cesium.Scene.prototype.initializeFrame = function() {};


/**
 */
Cesium.Scene.prototype.render = function() {};


/**
 * @type {Cesium.SceneMode}
 */
Cesium.Scene.prototype.mode;



/**
 * @constructor
 */
Cesium.SceneMode = function() {};


/**
 * @type {Cesium.SceneMode}
 */
Cesium.SceneMode.COLOMBUS_VIEW;


/**
 * @type {Cesium.SceneMode}
 */
Cesium.SceneMode.MORPHING;


/**
 * @type {Cesium.SceneMode}
 */
Cesium.SceneMode.SCENE2D;


/**
 * @type {Cesium.SceneMode}
 */
Cesium.SceneMode.SCENE3D;



/**
 * @constructor
 * @extends {Cesium.ImageryProvider}
 * @param {Cesium.SingleTileImageryProviderOptions} options
 */
Cesium.SingleTileImageryProvider = function(options) {};


/**
 * @typedef {{url: string}}
 */
Cesium.SingleTileImageryProviderOptions;



/**
 * @constructor
 */
Cesium.SkyAtmosphere = function() {};


/**
 * @constructor
 * @param {{positiveX: string, negativeX: string,
 *          positiveY: string, negativeY: string,
 *          positiveZ: string, negativeZ: string}} options
 */
Cesium.SkyBox = function(options) {};



/**
 * @interface
 * HACK This type definition prevents positiveX and friends
 * to be renamed when passing options to Cesium.SkyBox. There
 * must be a better way to do this!
 */
Cesium.SkyBoxOptions_ = function() {};


/**
 * @type {string}
 */
Cesium.SkyBoxOptions_.prototype.positiveX;


/**
 * @type {string}
 */
Cesium.SkyBoxOptions_.prototype.negativeX;


/**
 * @type {string}
 */
Cesium.SkyBoxOptions_.prototype.positiveY;


/**
 * @type {string}
 */
Cesium.SkyBoxOptions_.prototype.negativeY;


/**
 * @type {string}
 */
Cesium.SkyBoxOptions_.prototype.positiveZ;


/**
 * @type {string}
 */
Cesium.SkyBoxOptions_.prototype.negativeZ;
