//// Operaciones básicas ////
// suma
function suma(a,b,dec){
    let displacement = Math.pow(10,dec)
    let correction = a*displacement + b*displacement;
    return correction/displacement;
}

// resta
function resta(a,b,dec){
    let displacement = Math.pow(10,dec)
    let correction = a*displacement - b*displacement;
    return correction/displacement;
}

// multiplicacion
function mult(a,b){
    return a*b
}

// division
function div(a,b){
    if(b==0){
        return "Math error"
    }else{
        return a/b
    }
}