var mongoose = require('mongoose');



let Schema = mongoose.Schema

const mySchema = new Schema({
  user: String,
  message: {type: String, required: true},
  date: Date,
})


const model  = mongoose.model('Mensajes', mySchema)

mongoose.connect('mongodb://127.0.0.1:27017/Mensajes', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

console.log('Ya se conecto este Pedo');

let mensaje = new model({user:"Aaron Luna", message:"Mensaje para mongo DB", date:new Date()})
mensaje.save()

console.log(model.find());
