const express = require('express')
const app = express()
const PORT = process.argv[2] || 8080
const cluster = require('cluster')
const MODO = process.argv[3] | "fork"
const Calculo = Number(process.argv[4])
const numCPUs = require('os').cpus().length
app.set("views","views")
app.set(`view engine`, `ejs`)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


//  INFO

if(MODO === "cluster"){

    for (i=0; i< numCPUs; i++){
        cluster.fork()
    }
    cluster.on('exit',(worker,code,signal)=>{
        console.log(`worker ${worker.process.pid} died`)
    })
}else{

    app.listen(PORT, (req,res)=>{
        console.log(`Escuchando al servidor ${PORT}`)
    })
    
    //  HOME
    app.get("/home",(req, res, next)=>{
        return res.render("home")
    })
    
    app.get("/info",(req, res)=>{
        const info= {                                        
            path : process.execPath, 
            platform : process.platform,       
            processId : process.pid,
            nodeVer : process.version,                                              
            dir : process.cwd(),
            memory : JSON.stringify(process.memoryUsage())
        }
        res.render("info", info)
    })
    
    // API RANDOMS
    
    app.get("/api/random",(req, res)=>{

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
				console.log(`${numeros[i]}:${contador}`);
			}
			contador = 0;
		}
 
		// array con los numero repetidos
		console.log(repetidos);

        res.render("random")
    })
}







