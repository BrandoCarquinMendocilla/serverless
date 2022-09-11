import { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from 'aws-lambda'
let axios = require('axios')
import cs from '../config/constants'
import { Planets } from './mapper/interface/Planets'
import { TreePlanets } from './mapper/interface/TreePlanets'
import cn from '../common/connectionDB'

const handler: Handler<APIGatewayProxyEvent, APIGatewayProxyResult> = async ( event: APIGatewayProxyEvent ) => {
  return {
    headers: {
      'Content-Type': 'application/json',
    },
    statusCode: 200,
    body: "Bienvenido Api Rest Brando Javier Carquin Mendocilla - Serverless",
  }
}

const detallePlaneta: Handler<APIGatewayProxyEvent, APIGatewayProxyResult> = async ( event: APIGatewayProxyEvent ) => {
  const body = JSON.parse(event.body)
  if (event.body == null || event.body == undefined || body.id == null || body.id == undefined || body.id == 0 || body.id == "" || isNaN(body.id)) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        status: false,
        body: {
          codigoError: 400,
          mesajeEror: "Debe enviar el campo id correctamente"
        }
      }),
    }
  }

  let res = await axios.get(`${cs.constants.API}/planets/${body.id}/`)
  return {
    statusCode: 200,
    body: JSON.stringify({
      status: true,
      body:{
        data: PlanetToTreePlanets(res.data)
      } 
    }),
  }
}

function PlanetToTreePlanets(x: Planets): TreePlanets<Planets> {
  return {
    nombre: x.name,
    periodo_de_rotacion: x.rotation_period ,
    periodo_orbital: x.orbital_period ,
    diametro: x.diameter ,
    climatizado: x.climate ,
    gravedad: x.gravity ,
    terreno: x.terrain ,
    superficie_del_agua: x.surface_water ,
    poblacion: x.population ,
    residentes: x.residents ,
    películas: x.films ,
    fechaCreacion: x.created ,
    fechaActualizacion: x.edited ,
    url: x.url
  };
}

const registrarPersonaje = async ( event: APIGatewayProxyEvent, context:any ) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const body = JSON.parse(event.body)

  const sql = `CALL SP_CREATEDATA("${body.name}","${body.altura}","${body.peso}")`;
  const [rows, fields] = await cn.promise().query(sql);
  return {
    headers: {
      'Content-Type': 'application/json',
    },
    statusCode: 200,
    body: JSON.stringify({
      status: true,
      body:{
        data: "Registro Creado Correctamente"
      }
    })
  }
  
}

const mostrarPersonaje = async ( event: APIGatewayProxyEvent, context:any ) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const sql = `CALL SP_GETPERSONAJES()`;
  const [rows, fields] = await cn.promise().query(sql);
  return {
    headers: {
      'Content-Type': 'application/json',
    },
    statusCode: 200,
    body: JSON.stringify({
      status: true,
      body:{
        data: rows
      }
    })
  }
}


export { handler, detallePlaneta, registrarPersonaje, mostrarPersonaje }