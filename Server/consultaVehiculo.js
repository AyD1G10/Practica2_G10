//funciones para el manejo de vehiculos en servicios

const fs = require('fs')

//funcion para buscar un vehiculo por su placa 
function getVheichulo(placa){
    let data = getData('./database.json');
    if (data != null){
        let info_json = JSON.parse(data);
        let json_resonse = {data:[]};
        //obtener tabla vehiculos
        for(let dato of info_json.database){
            if(dato.table == "vehiculos_enServicio"){
            datos_vehiculo =dato.data
                for (let dato_v of datos_vehiculo){
                    if(dato_v.placa == placa){
                        json_resonse.data.push(dato_v)
                    }
                }
            }
        }
        return (json_resonse);
    }
}

//leer archivo json
function getData(archivo){
    let data ;
    try {
       data= fs.readFileSync(archivo);
       return data;
    } catch (error) {
        return null;
    }
}

//ingresar vehiculo a servicio
function agregarVehiculo(placa, user,estado,desc,fecha_e,fecha_salda,database){
    let datos = {
        placa: placa,
        id_user: user,
        Estado : estado,
        descripcion : desc,
        fecha_servicio: fecha_e,
        fecha_salida: fecha_salda
    };

    var direccion = database
    let data = getData(direccion);

    if (data != null){
        
        let info_json = JSON.parse(data);
        info_json.database[2].data.push(datos)
        let nuevojson = JSON.stringify(info_json, null, 2);
        
        return EscribirDatabase(nuevojson,direccion);
    }
    return false; 

}

function EscribirDatabase(nuevo_json, direccion){
    try {
        fs.writeFileSync(direccion, nuevo_json);
        return true;
    } catch (error) {
        return false;
    }
}

//funcion eliminar vehiculo
function ElininarVechiculo(placa, base){
    let data = getData(base);
    if(data != null){
        let info_json = JSON.parse(data);
        //obtener tabla vehiculos
        //console.log(info_json.database[2].data);
        contador =0;
        for(let dato of info_json.database[2].data){
            if( placa == dato.placa){
                info_json.database[2].data.splice(contador,1);
                //guardar en base de datos
                let nuevojson = JSON.stringify(info_json, null, 2);
                return EscribirDatabase(nuevojson,base);
            }
            contador++;
        }
    }
    return false;
}
//console.log(getData('../database.json'))
//ElininarVechiculo("p355bgw",'./database.json');
//console.log(agregarVehiculo("p554dtr","1","0","ingresado a servicio","27/03/2021","---"));
module.exports = { getVheichulo , getData, EscribirDatabase, agregarVehiculo,ElininarVechiculo}