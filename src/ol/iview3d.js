goog.provide('ol.IView3D');

/**
 * @typedef {{center: ol.Coordinate,
 *            projection: ol.Projection,
 *            resolution: number,
 *            rotation: number}}
 */
ol.View3DState;

/**
 * Interface for views.
 * @interface
 */
ol.IView3D = function() {
};


/**
 * @return {ol.View3DState} View3D state.
 */
ol.IView3D.prototype.getView3DState = function() {
};