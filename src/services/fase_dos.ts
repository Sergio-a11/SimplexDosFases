import {
   
    iterar,
    type Iteracion
     
}from '../services/obj_ecuacion';

import {
    SolucionOptima,
    }from '../services/obj_ecuacion';


  function faseDos(iteracion: Iteracion) {
     
    let numerosR = Number.isNaN(Number.parseInt(localStorage.numeroR))? 0: Number.parseInt(localStorage.numeroR);
        let indexR = iteracion.valoresCj.findIndex(a => a === 1)
        iteracion.ZjCj.splice(indexR, numerosR)
        iteracion.variablesArtificialesTexto.splice(indexR,numerosR)
        iteracion.valoresCj.splice(indexR, numerosR)
        iteracion.ecuaciones.forEach(filas => {
        filas.valores.splice(indexR,numerosR)
    
        });     
  
        let funcionZ: Array <number> = JSON.parse(localStorage.funcionZ)?? [] ;
        let arr: Array<number> = [];

        arr.length = iteracion.valoresCj.length;
        arr.fill(0);
        //agrgar valores de X
        
          funcionZ.forEach((e, i) => {
            arr[i] = e
          });
        
        iteracion.valoresCj = arr;
        iterar(iteracion);
        console.log(iteracion);
    }
    

  
  
  
  
  
  