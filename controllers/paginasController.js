import {Viaje} from '../models/Viaje.js'
import {Testimonios} from '../models/testimonios.js'


const paginaInicio = async (req, res) => {
  //Consultar viajes y testimonios en la DB

  const promiseDB = [] //Guardaremos las dos consultas a la base de datos en un array para que se pueden ejecutar simultaneamente
  //Agregamos al array cada una de las consultas a la DB
  promiseDB.push(Viaje.findAll({limit: 3}))
  promiseDB.push(Testimonios.findAll({limit: 3}))
  try {
    const resultado = await Promise.all( promiseDB ) //Este promise.all va a ejecutar todas las consultas en el array simultaneamente y retornará los resultados en forma de array con cada resultado estando en la misma posicion que su respectiva consulta
    res.render('inicio', {
      pagina: 'Inicio',
      clase: 'home',
      viajes: resultado[0],
      testimonios: resultado[1],
    })
    
  } catch (error) {
    console.log(error);
  }
};

const paginaNosotros = (req, res) => {
  res.render('nosotros', {
    pagina: 'Nosotros',
  })
}

const paginaViajes = async (req, res) => {
  //Consulta de la DB
  const viajes = await Viaje.findAll();

  res.render('viajes', {
    pagina: 'Proximos Viajes',
    viajes,
  })
}

const paginaTestimonios = async (req, res) => {
  try {
    const testimonios = await Testimonios.findAll()
    res.render('testimonios', {
      pagina: 'Testimonios',
      testimonios,
    })
  } catch (error) {
    console.log(error);
  }
}

//Muestra un viaje por slug
const paginaDetallesViaje = async (req, res) => {
  const {slug} = req.params;
  try {
    const viaje = await Viaje.findOne({where : {slug}})
    res.render( 'viaje', {
      pagina: 'Información Viaje',
      viaje,
    })
  } catch (error) {
    console.log(error);
  }
}
export {
  paginaInicio,
  paginaNosotros,
  paginaViajes,
  paginaTestimonios,
  paginaDetallesViaje,
}