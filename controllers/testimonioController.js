import {Testimonios} from '../models/testimonios.js';

const guardarTestimonio = async (req, res) => {
  //Validar formulario
  const {nombre, email, mensaje} = req.body;

  const errores = [];
  if(nombre.trim() === '') {
    errores.push({mensaje: 'El nombre esta vacio'})
  }
  if(email.trim() === '') {
    errores.push({mensaje: 'El email esta vacio'})
  }
  if(mensaje.trim() === '') {
    errores.push({mensaje: 'El mensaje esta vacio'})
  }

  if(errores.length > 0) {
    const testimonios = await Testimonios.findAll()
    
    res.render('testimonios', {
      pagina: 'Testimonios',
      errores,
      nombre,
      email,
      mensaje,
      testimonios,
    })
  } else {
    //Almacenar testimonio en la DB
    try {
      await Testimonios.create({
        nombre,
        email,
        mensaje,
      })
      res.redirect('/testimonios');
    } catch (error) {
      console.log(error);
    }
  }
  
}

export {
  guardarTestimonio
}