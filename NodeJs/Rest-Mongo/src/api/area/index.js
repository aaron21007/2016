import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Area, { schema } from './model'

const router = new Router()
const { nombre, actividad } = schema.tree

/**
 * @api {post} /areas Create area
 * @apiName CreateArea
 * @apiGroup Area
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam nombre Area's nombre.
 * @apiParam actividad Area's actividad.
 * @apiSuccess {Object} area Area's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Area not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ nombre, actividad }),
  create)

/**
 * @api {get} /areas Retrieve areas
 * @apiName RetrieveAreas
 * @apiGroup Area
 * @apiUse listParams
 * @apiSuccess {Object[]} areas List of areas.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /areas/:id Retrieve area
 * @apiName RetrieveArea
 * @apiGroup Area
 * @apiSuccess {Object} area Area's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Area not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /areas/:id Update area
 * @apiName UpdateArea
 * @apiGroup Area
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam nombre Area's nombre.
 * @apiParam actividad Area's actividad.
 * @apiSuccess {Object} area Area's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Area not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ nombre, actividad }),
  update)

/**
 * @api {delete} /areas/:id Delete area
 * @apiName DeleteArea
 * @apiGroup Area
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Area not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
