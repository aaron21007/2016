import { Area } from '.'

let area

beforeEach(async () => {
  area = await Area.create({ nombre: 'Informnatica', actividad: 'Reaparacion de Computadoras' })
  
})

describe('view', () => {
  it('returns simple view', () => {
    const view = area.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(area.id)
    expect(view.nombre).toBe(area.nombre)
    expect(view.actividad).toBe(area.actividad)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = area.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(area.id)
    expect(view.nombre).toBe(area.nombre)
    expect(view.actividad).toBe(area.actividad)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
