import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Empleado, { schema } from './model'

const router = new Router()
const { nombre, matricula, areas } = schema.tree

/**
 * @api {post} /empleados Create empleado
 * @apiName CreateEmpleado
 * @apiGroup Empleado
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam nombre Empleado's nombre.
 * @apiParam matricula Empleado's matricula.
 * @apiParam areas Empleado's areas.
 * @apiSuccess {Object} empleado Empleado's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Empleado not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ nombre, matricula, areas }),
  create)

/**
 * @api {get} /empleados Retrieve empleados
 * @apiName RetrieveEmpleados
 * @apiGroup Empleado
 * @apiUse listParams
 * @apiSuccess {Object[]} empleados List of empleados.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /empleados/:id Retrieve empleado
 * @apiName RetrieveEmpleado
 * @apiGroup Empleado
 * @apiSuccess {Object} empleado Empleado's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Empleado not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /empleados/:id Update empleado
 * @apiName UpdateEmpleado
 * @apiGroup Empleado
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam nombre Empleado's nombre.
 * @apiParam matricula Empleado's matricula.
 * @apiParam areas Empleado's areas.
 * @apiSuccess {Object} empleado Empleado's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Empleado not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ nombre, matricula, areas }),
  update)

/**
 * @api {delete} /empleados/:id Delete empleado
 * @apiName DeleteEmpleado
 * @apiGroup Empleado
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Empleado not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
