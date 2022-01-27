// Creacion del objeto para el jugador
onDisplay = new Opcion(document.getElementById("display")) 
onDisplay.setObjeto("3");                                   

// Creacion del objeto para el bot
botSelection = new Opcion (document.getElementById("bot-selection"));
botSelection.setObjeto("3");

// Cambio de opcion
document.querySelectorAll('.opcion').forEach(item => {
    item.addEventListener('click', e => {
        onDisplay.setObjeto(item.id);
        setIdle(2050);
        updateSelection(item);

    })
  })

// Confirmar seleccion
document.getElementById('display').addEventListener('click', e => {
    if(onDisplay.currentID != 3){
        computeResult(onDisplay.currentID);
        ingame = true;

        document.getElementById('opciones').style.animation = "desvanecer 0.5s ease 0.4s forwards";
        document.getElementById('destello').style.animation = "rotacion 5s linear 0s infinite, desvanecer 1s ease forwards";
        toggleOptions();
        document.getElementById('anti-click').style.zIndex = 1;
    }
})

// Cerrar overlay
document.querySelectorAll('.overlay').forEach(item => {
    item.addEventListener('click', e =>{
        item.style.height = "0vh";
        botSelection.setObjeto("3");
        ingame = false;
        setIdle(0);

        document.getElementById('opciones').style.animation = "aparecer 1s ease forwards";
        document.getElementById('destello').style.animation = "rotacion 5s linear 0s infinite, aparecer 1s ease forwards";
        toggleOptions();
        if (!ingame){
            toggleOptions();
        }
        document.getElementById('anti-click').style.zIndex = -1

    })
})