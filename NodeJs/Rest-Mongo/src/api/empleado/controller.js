import {
  success,
  notFound
} from '../../services/response/'
import {
  Empleado
} from '.'

export const create = ({
    bodymen: {
      body
    }
  }, res, next) =>
  Empleado.create(body)
    .then((area) => area.save(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({
    querymen: {
      query,
      select,
      cursor
    }
  }, res, next) =>
  Empleado.find(query, select, cursor)
  .then((empleados) => empleados.map((empleado) => empleado.view()))
  .then(success(res))
  .catch(next)

export const show = ({
    params
  }, res, next) =>
  Empleado.findById(params.id)
  .then(notFound(res))
  .then((empleado) => empleado ? empleado.view() : null)
  .then(success(res))
  .catch(next)

export const update = ({
    bodymen: {
      body
    },
    params
  }, res, next) =>
  Empleado.findById(params.id)
  .then(notFound(res))
  .then((empleado) => empleado ? Object.assign(empleado, body).save() : null)
  .then((empleado) => empleado ? empleado.view(true) : null)
  .then(success(res))
  .catch(next)

export const destroy = ({
    params
  }, res, next) =>
  Empleado.findById(params.id)
  .then(notFound(res))
  .then((empleado) => empleado ? empleado.remove() : null)
  .then(success(res, 204))
  .catch(next)
