import mongoose, {
  Schema
} from 'mongoose'

const empleadoSchema = new Schema({
  nombre: {
    type: String
  },
  matricula: {
    type: String
  },
  areas: {
    type: Schema.ObjectId,
    ref: 'Area'
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => {
      delete ret._id
    }
  }
})

empleadoSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      nombre: this.nombre,
      matricula: this.matricula,
      areas: this.areas , //? this.areas.view(full) : null,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Empleado', empleadoSchema)

export const schema = model.schema
export default model
