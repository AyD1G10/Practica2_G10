//funciones para el manejo de vehiculos en servicios

const fs = require('fs')

//funcion para buscar un vehiculo por su placa 
function getVheichulo(placa){
    let data = getData('./database.json');
    if (data== null){
        return {data:[]};
    }else{

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

//console.log(getVheichulo("p355bgw"));
//console.log(getData());
module.exports = { getVheichulo , getData}