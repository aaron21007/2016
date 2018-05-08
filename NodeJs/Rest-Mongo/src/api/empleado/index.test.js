import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import { Area } from '../area'
import routes, { Empleado } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, empleado, medicina_x

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  const medicina = await Area.create({nombre:'Soldados', actividad:'armas'})

  medicina_x = await Area.create({nombre:'Soldados', actividad:'armas'})
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  empleado = await Empleado.create({})
})

test('POST /empleados 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession, nombre: 'empleado 1', matricula: '12312312312', areas:medicina_x.id})
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.nombre).toEqual('empleado 1')
  expect(body.matricula).toEqual('12312312312')
  //expect(body.areas.id).toEqual(medicina_x.id)
})

test('POST /empleados 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /empleados 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /empleados 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /empleados/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${empleado.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(empleado.id)
})

test('GET /empleados/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

// test('PUT /empleados/:id 200 (admin)', async () => {
//   const { status, body } = await request(app())
//     .put(`${apiRoot}/${empleado.id}`)
//     .send({ access_token: adminSession, nombre: 'test', matricula: 'test', areas: medicina_x })
//   expect(status).toBe(200)
//   expect(typeof body).toEqual('object')
//   expect(body.id).toEqual(empleado.id)
//   expect(body.nombre).toEqual('test')
//   expect(body.matricula).toEqual('test')
//   expect(typeof body.areas).toEqual('object')
// })

test('PUT /empleados/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${empleado.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /empleados/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${empleado.id}`)
  expect(status).toBe(401)
})

test('PUT /empleados/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, nombre: 'test', matricula: 'test', areas: 'test' })
  expect(status).toBe(404)
})

test('DELETE /empleados/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${empleado.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /empleados/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${empleado.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /empleados/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${empleado.id}`)
  expect(status).toBe(401)
})

test('DELETE /empleados/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
