const fs = require('fs')

//funcion para leer archivo json y buscar un vehiculo por su placa 
function getVheichulo(placa){
    let data = fs.readFileSync('./database.json');
    let info_json = JSON.parse(data);
   
    let existe = false;
    //obtener tabla vehiculos
    for(let dato of info_json.database){
        if(dato.table == "vehiculos"){
           datos_vehiculo =dato.data
           console.log(datos_vehiculo);
            for (let dato_v of datos_vehiculo){
                if(dato_v.placa == placa){
                    console.log("existe en base de datos: " + dato_v.placa + " , placa nueva " + placa);
                    existe = true;
                    break;
                }
            }
        }
    }
    return existe;
} 

function EscribirDatabase(nuevo_json){
    try {
        fs.writeFileSync('./database.json', nuevo_json);
        return true;
    } catch (error) {
        return false;
    }
}

function AnioValido(anio) {
    return (/.*19[5-9][0-9]|20[0-1][0-9]|202[0-2].*/.test(anio));
  }


function placaValida(placa) {
    return (/.*[A|C|M|O|P|TC|TE|TRC|U][A-Z]{3}[0-9]{3}.*/.test(placa));
}


//agregamos un nuevo vehiculo a la base de datos del archivo json 
function setVehiculo(idusuario, placa, modelo, marca, linea){
    
    let vehiculo = { 
        id_user: idusuario, 
        placa: placa,
        modelo: modelo,
        marca: marca,
        linea : linea 
    };

    if(!Validaciones(placa,modelo)){
        return false;
    }
    var json = JSON.parse(fs.readFileSync('./database.json'));

    json.database[1].data.push(vehiculo);
    console.log(json.database[1]);
    
    let nuevojson = JSON.stringify(json, null, 2);
    
    EscribirDatabase(nuevojson);

    return true;
}

function Validaciones(placa, anio){
    if (!AnioValido(anio)) { console.log('1er. errorrrrrrrrrrrrrrr'); return false; }
    if (!placaValida(placa)) { console.log('4to. errorrrrrrrrrrrrrrr'); return false; }
    
    return true;
}


module.exports = { getVheichulo, setVehiculo , EscribirDatabase , AnioValido, placaValida, Validaciones} 
/*

validar si archivo existe

*/

/*
validar si el año del modelo es valido
validar si la placa es valida


*/