const express = require('express')
const cluster = require('cluster')
const compression = require('compression')
const autocannon = require('autocannon')

const app = express()
const PORT = process.argv[2] || 8080
const MODO = process.argv[3] | "fork"
const Calculo = Number(process.argv[4])
const numCPUs = require('os').cpus().length
const { logInfo, logWarn, logError } = require ('./log4js-Config')
const {isPrime} = require('./primeF')

app.set("views","views")
app.set(`view engine`, `ejs`)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(compression())
//La diferencia entre kilobites entre el archivo comprimido y no comprimido es la Mitad. 1.1kb de peso comprimdo y 2.2kb de peso no comprimido

//  INFO

if(MODO === "cluster"){
    logInfo.info(`----Número de procesadores: ${numCPUs}`)
    logInfo.info(`----PID MASTER ${process.pid}`)
 
    for (i=0; i< numCPUs; i++){
        cluster.fork()
    }
    cluster.on('exit',(worker,code,signal)=>{
        logInfo.info(`---worker ${worker.process.pid} died`)
    })
}else{

    app.listen(PORT, (req,res)=>{
        try {
            logWarn.warn('------primer warn')
            logInfo.info(`------Escuchando al servidor ${PORT}`)
        } catch (err) {
            logError(err)
        }  
    })
    
    //  HOME

    app.get("/home",(req, res, next)=>{
        try {
            logInfo.info("----URL:" + req.url)
            logInfo.info("----METHOD:" + req.method)
            logWarn.warn('------segundo warn')
            return res.render("home")
        } catch (err) {
            logError(err)
        }  
    })
    
    app.get("/info",(req, res)=>{
        try {
            logInfo.info("----URL:" + req.url)
            logInfo.info("----METHOD:" + req.method)
            const primes = []
            const max = Number(req.query.max) || 1000
            for (let i = 1; i <= max; i++) {
                if (isPrime(i)) primes.push(i)
            }
            res.json(primes)
        } catch (err) {
            logError(err)
        }     
    })
    
    // API RANDOMS
    
    app.get("/api/random",(req, res)=>{
        try {
            logInfo.info("----URL:" + req.url)
            logInfo.info("----METHOD:" + req.method)
            logWarn.warn('------cuarto warn')
            let numeros = []
            for(i=0; i<Calculo; i++){
                randomNum = Math.floor((Math.random() * (1 - 1000 + 1)) + 1)
                numeros.push(randomNum)
            }

            var contador = 0;
            var repetidos = [];
            var total = numeros.length;
    
            for (var i = 0; i < total; i++) {
                for (var j = 0; j < total; j++) {
                    if (parseInt(numeros[i]) == parseInt(numeros[j])) {
                        contador++;
                    }
                }
    
                if (contador > 1 && repetidos.indexOf(parseInt(numeros[i])) === -1) {
                    repetidos.push(parseInt(numeros[i]));
                    logInfo.info(`--${numeros[i]}:${contador}`);
                }
                contador = 0;
            }

            logInfo.info(repetidos)
            res.render("random")
        } catch (err) {
            logError(err)
        }         
    })
}







