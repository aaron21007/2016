import mongoose, { Schema } from 'mongoose'

const areaSchema = new Schema({
  nombre: {
    type: String
  },
  actividad: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

areaSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      nombre: this.nombre,
      actividad: this.actividad,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Area', areaSchema)

export const schema = model.schema
export default model
