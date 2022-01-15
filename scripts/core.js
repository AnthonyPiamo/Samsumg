//// core.js contiene los listeners para las pulsaciones de botón
//// Esto permite escribir el numero deseado, el cual al pulsar un boton de operacion
//// guardará el valor en el HTML y aplicará la funcion correspondiente

// Definiciones para diferenciar entre operando y número
var operaciones = ["0","1","2","3","4","5","6","7","8","9"];

// main loop
window.addEventListener('DOMContentLoaded', (event) => {

  // Elementos del display, current es editable, past es la linea superior
  var current = document.getElementById("valor-actual");
  var past = document.getElementById("valor-anterior");  

  // Funcion responsable del cambio de display
  function submit() {
    past.innerText = current.innerText;
    current.innerText = '';
  }

  // Estado de la Operación A Realizar, default es "none"
  var OAR_status = "none";

  // Regresa un entero; la cantidad de decimales mayor entre 2 strings.
  function highestDecimal(x,y){
    if (x.includes(".")){
      j = x.split(".")[1].length;
    }else{ j = 0; }
    if (y.includes(".")){
      k = y.split(".")[1].length;
    }else{ k = 0; }

    if(j>=k){
      return j;
    }else{
      return k;
    }
  }
  
  // realiza las operaciones
  function operate(){
    let decimal_place = highestDecimal(current.innerText,"0.2");
    let num1 = past.innerText;
    let num2 = current.innerText;

    if (OAR_status != "none"){

      switch(OAR_status){
        case "suma":
          past.innerText = suma(num1,num2,decimal_place);
          break;
        case "resta":
          past.innerText = resta(num1,num2,decimal_place);
          break;
        case "multiplicacion":
          past.innerText = mult(num1,num2);
          break;
        case "division":
          past.innerText = div(num1,num2);
          break;

      }
    current.innerText = '';
    OAR_status = "none";
    }
  }


  // Listener para cada pulsacion de boton
  document.addEventListener('click', ({ target }) => {
    // si lo clickeado es un boton y este es un numero, escribe en current
    if (target.matches('button') && operaciones.includes(target.innerText)) {
      current.innerText = current.innerText + target.innerText;
  }else{ // si no es un numero, esta sección determina que acción se realizará, C borra todo, ← borra el ultimo digito, los operandos copian el valor a "past" y guardan dicho estado, si past tiene algo, ejecutan la operacion y guarda estado, = solo ejecuta la operacion, . insertará un decimal
    switch(target.innerText){

      //Caso decimal: si ya tiene, omite agregar un nuevo decimal
      case ".": 
        if (current.innerText.includes(".")){
          break;
        }else{
          current.innerText += "."
        }
        break;
      
      // Caso igual: revisa la operacion a realizar y la ejecuta, si no hay, omite hacer cambios, al final limpia el estado del operando
      case "=":
        operate();
        break;
      
      // casos de operaciones, actualizan OAR y envian el valor al display superior //
      case "+":
        if (OAR_status != 'none'){
          operate();
        }else{
          submit();
        }
        OAR_status = "suma";
        break;
      
      case "-":
        if (OAR_status != 'none'){
          operate();
        }else{
          submit();
        }
        OAR_status = "resta";
        break;

      case "×":
        if (OAR_status != 'none' && OAR_status!=0){
          operate();
        }else{
          submit();
        }
        OAR_status = "multiplicacion";
        break;

      case "÷":
        if (OAR_status != 'none'){
          operate();
        }else{
          submit();
        }
        OAR_status = "division";
        break;
      
      // Caso CLEAR: "corta" el ultimo caracter del display inferior
      case "←":
        current.innerText = current.innerText.slice(0, -1);
        break;

      // Caso CLEAR ALL: borra todo y resetea el valor de OAR
      case "C":
        past.innerText = "0";
        current.innerText = '';
        OAR_status = "none";
        break;
    }
  }
});
});
