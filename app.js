const express = require('express');
const app = express();
const PORT = 3000;

//Ruta prueba
app.get('/',(req,res)=>{
    res.send("Estoy escuchando tu solicitud!")
})

app.get('/consulta',(req,res)=>{
    res.json({
        message: "Estoy escuchando tu solicitud!"})
})

//Iniciar el servidor
app.listen(PORT, () =>{
        console.log(`Servidor escuchando en: http://localhost:${PORT}`)
})