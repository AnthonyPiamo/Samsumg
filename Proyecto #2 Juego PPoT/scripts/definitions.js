/// CLASES ///

// Clase para cada objeto del juego, contiene data de selección y la imagen asociada
class Opcion{
    constructor(_elemento){
        this.elemento= _elemento;
        this.currentID= "3"
    }
    
    setObjeto(_id){
        while (this.elemento.firstChild){
            this.elemento.removeChild(this.elemento.firstChild); 
        }
        switch(_id){
            case ("0"):
                const roca1 = document.createElement("img");
                const roca2 = document.createElement("img");
                const roca3 = document.createElement("img");
                roca1.src = "./sprites/Piedra/rocaBtm.svg";
                roca2.src = "./sprites/Piedra/rocaTL.svg";
                roca3.src = "./sprites/Piedra/rocaTR.svg";
                roca1.id = roca2.id = roca3.id = "piedra";
                roca1.className = "roca-btm objeto spawn-BT";
                roca2.className = "roca-TL objeto spawn-TL";
                roca3.className = "roca-TR objeto spawn-TR";
                this.elemento.appendChild(roca1);
                this.elemento.appendChild(roca2);
                this.elemento.appendChild(roca3);
                this.currentID= 0
                break;
            case ("1"):
                const papel = document.createElement("img");
                papel.src = "./sprites/Papel/dob/1.svg";
                papel.id = "papel"
                papel.className = "objeto spawn-PP"
                this.elemento.appendChild(papel);
                this.currentID= 1
                break;
            case ("2"):
                const tijera1 = document.createElement("img");
                const tijera2 = document.createElement("img");
                tijera1.src = "./sprites/Tijeras/TijerasBackground.svg";
                tijera2.src = "./sprites/Tijeras/TijerasForeground.svg";
                tijera1.id = tijera2.id = "tijeras";
                tijera1.className = "tijeras-background objeto spawn-TB";
                tijera2.className = "tijeras-foreground objeto spawn-TF";
                this.elemento.appendChild(tijera1);
                this.elemento.appendChild(tijera2);
                this.currentID= 2
                break;
            default:
                const defaultIco = document.createElement("p");
                defaultIco.innerText="?";
                defaultIco.style.fontSize="10em";
                defaultIco.style.fontFamily="square-void"
                defaultIco.style.textShadow=  "1px 1px 15px rgb(0 0 0 / 70%)";
                this.elemento.appendChild(defaultIco);
        }
    }
}


/// FUNCIONES ///

// Funcion sleep(), requerida para que el juego no sea tan monotono
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

// Devuelve un valor numerico NATURAL dado un rango
function rangoAleatorio(min,max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Devuelve un valor numerico REAL dado una desviacion y un centro; centro±desviacion
function rangoDecimal(desviacion,centro){
    return Math.random()*desviacion+centro-desviacion/2;
}

// Acciones a realizar al ganar
function victoria(){
    let overlay = document.getElementById("victoria")
    overlay.style.height = "100vh";
}

// Acciones a realizar al empatar
function empate(){
    let overlay = document.getElementById("empate")
    overlay.style.height = "100vh";
}

// Acciones a realizar al perder
function derrota(){
    let overlay = document.getElementById("derrota")
    overlay.style.height = "100vh";
}

// Actualiza las clases al seleccionar un objeto
function updateSelection(i){
    document.querySelectorAll(".opcion").forEach(item =>{
        item.classList.remove("selected");
        item.classList.remove("not-selected");
        item.classList.add("not-selected");
    })
    i.classList.add("selected");
    i.classList.remove("not-selected");
}

// Oculta/muestra las opciones
var shown = true;
async function toggleOptions(){
    if(shown){
        document.getElementById("display").classList.add("sin-fondo");
        document.querySelectorAll(".opcion").forEach(item =>{
            item.classList.add("opcion-oculta");
        })
        shown = false;
        return;
    }
    await sleep(1000);
    document.getElementById("display").classList.remove("sin-fondo");
    document.querySelectorAll(".opcion").forEach(item =>{
        item.classList.remove("opcion-oculta");
    })
    shown = true;
}

// Calcula qué resultado va a dar el bot y lo envía a resultado
async function computeResult(item){

    await sleep(rangoDecimal(400,650));
    let bot = rangoAleatorio(0,2);    // Selección del "bot"
    botSelection.setObjeto(bot.toString());
    setIdle(2000);
    await sleep(500);
    resultado(item,bot);  // Función a realizar para mostrar el resultado.

}

// Revisa el resultado entre 2 jugadas usando un array2D de casos victoriosos
function resultado(j,b){
    if(j==b){
        empate();
        return;
    }
    for(let caso of winCase){
        if (j==caso[0] && b==caso[1]){
            victoria();
            return;
        }
    }
    derrota();
}

// Luego de un delay cambia a las animaciones "idle"
async function setIdle(delay){
    if(!callable){
        return;
    }
    callable = false;
    await sleep(delay);
    document.querySelectorAll(".objeto").forEach(item=>{
        let classes = item.classList
        let sufijo = classes[classes.length - 1].slice(-3)
        item.classList.replace(classes[classes.length - 1], "idle"+sufijo)
    })
    callable = true;
    return;
}

/// VARIABLES ///

// Array 2D que contiene los casos en donde el jugador gana
var winCase = [[0,2],[1,0],[2,1]]; 
var loseCase = [[2,0],[0,1],[1,2]];

var callable = true;
var ingame = false;
