$(document).ready(() => {
    /******************************
    * Creamos varibles y objetos
    ******************************/
    var app = $('#app');
    var cantidad = $('#cantidad');

    var mas = $('#btn-mas');
    var menos = $('#btn-menos');
    var generar = $('#btn-generar');
    var pass = $('.input-password');
    var copiado = $('#copiado');

    var minusculas = $('#btn-minusculas');
    var mayusculas = $('#btn-mayusculas');
    var numeros = $('#btn-numeros');
    var simbolos = $('#btn-simbolos');

    var configuracion = {
        caracteres: parseInt(cantidad.val()),
        minusculas: true,
        mayusculas: true,
        numeros: true,
        simbolos: false
    };

    var caracteres = {
        minusculas: 'a b c d e f g h i j k l m n o p q r s t u v w x y z',
        mayusculas: 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z',
        numeros: '0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9',
        simbolos: "! @ # $ % & / ( ) = * [ ] _ - . , : ' / + ? ¿ < > { } ;"
    };
    

    /******************************
    * Eventos
    ******************************/
   // Evitamos el envio del submit en formulario
    app.submit((e) => {
        e.preventDefault();
    });

    // Aumentamos longitud del password
    mas.click(() => {
        if(configuracion.caracteres < 30){
            configuracion.caracteres++;
            cantidad.val(configuracion.caracteres);
        }
    });

    // Disminuimos longitud del password
    menos.click(() => {
        if(configuracion.caracteres > 2){
            configuracion.caracteres--;
            cantidad.val(configuracion.caracteres);
        }
    });

    // Llamamos copiar password
    pass.click(function(){
        copiarPassword();
    });

    // Caracteres permitidos
    minusculas.click(function() {
        cambiarBtn($(this));
        configuracion.minusculas = !configuracion.minusculas;
    });
    mayusculas.click(function() {
        cambiarBtn($(this));
        configuracion.mayusculas = !configuracion.mayusculas;
    });
    numeros.click(function() {
        cambiarBtn($(this));
        configuracion.numeros = !configuracion.numeros;
    });
    simbolos.click(function() {
        cambiarBtn($(this));
        configuracion.simbolos = !configuracion.simbolos;
    });
    
    // Llamamos generar password
    generar.click(function(){
        generarPassword();
    });


    /******************************
    * Funciones
    ******************************/
   // Cambio de iconos en los botones de caracteres permitidos
    function cambiarBtn(boton){
        boton.toggleClass('false');
        boton.children().toggleClass('fa-check');
        boton.children().toggleClass('fa-times');
    }
    
    // Generamos password con los caracteres permitidos
    function generarPassword(){
        var caracteresFinales = '';
        var password = '';

        for(let propiedad in configuracion){
            if(configuracion[propiedad] == true){
                caracteresFinales += caracteres[propiedad] + ' ';
            }
        }

        caracteresFinales = caracteresFinales.trim();
        caracteresFinales = caracteresFinales.split(' ');

        for(let i = 0; i < configuracion.caracteres; i++){
            password += caracteresFinales[numeroAzar(0, caracteresFinales.length)];
        }
      
        if(password.length == 0){
            pass.css("color", "red");
            pass.val('Selecciona alguna opción');
        }else{
            pass.css("color", "black");
            pass.val(password);
        }
    }
    
    // Obtenemos un valor random para crear el password
    function numeroAzar(min, max){
        return Math.floor(Math.random() * (max - min)) + min;
    }

    // Seleccionamos la password y la copiamos
    function copiarPassword(){
        pass.select();
        document.execCommand('copy');
        copiado.toggleClass('active');
        //mostramos mensaje de copiado
        setTimeout(function(){
            copiado.toggleClass('active');
        }, 3000);
    }
});