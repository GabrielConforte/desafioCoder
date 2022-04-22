console.log("CHILD CREATED", process.pid)

process.on('message', (message) => {
    console.log("CHILD RECEIVED MESSAGE", message)

    const result = getRandom(message);

    process.send(result);

    setTimeout(process.exit,5000);
})



function getRandom(cant){
    
    let numeros = [];
    for (let i = 0; i < cant; i++) {
        numeros.push(Math.floor(Math.random() * 1000));
    }
    let resultados = {};
    for (let i = 0; i < numeros.length; i++) {
        if (resultados[numeros[i]]) {
            resultados[numeros[i]]++;
        } else {
            resultados[numeros[i]] = 1;
        }
    }
    return resultados;
    
};

module.exports = {getRandom};