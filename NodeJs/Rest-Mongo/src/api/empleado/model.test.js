import { Empleado } from '.'
import { Area } from '../area'

let empleado
let contaduria
beforeEach(async () => {
  contaduria = await Area.create({"__v": 0,nombre:'Fiscalia', actividad:'Administracion'})
  empleado = await Empleado.create({ nombre: 'test', matricula: 'test', areas: contaduria })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = empleado.view()

    expect(typeof view).toBe('object')
    expect(view.id).toBe(empleado.id)
    expect(view.nombre).toBe(empleado.nombre)
    expect(view.matricula).toBe(empleado.matricula)
    expect(view.areas).toBe(empleado.areas)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = empleado.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(empleado.id)
    expect(view.nombre).toBe(empleado.nombre)
    expect(view.matricula).toBe(empleado.matricula)
    expect(view.areas).toBe(empleado.areas)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
