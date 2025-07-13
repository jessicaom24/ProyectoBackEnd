const express = require('express');
const app = express();
const PORT = 8080;

//Esto permite a la aplicación recibir solicitudes en formato JSON


//Ruta prueba
app.get('/',(req,res)=>{
    res.send("Estoy escuchando tu solicitud!")
})

/*app.get('/consulta',(req,res)=>{
    res.json({
        message: "Estoy escuchando tu solicitud!"})
})*/

//Iniciar el servidor
app.listen(PORT, () =>{
        console.log(`Servidor escuchando en: http://localhost:${PORT}`)
})