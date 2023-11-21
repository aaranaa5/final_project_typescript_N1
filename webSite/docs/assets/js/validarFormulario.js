const formulario = document.getElementById('formularioUsuario');
const inputs = document.querySelectorAll('#formularioUsuario input');

const expresiones = {
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/, // 7 a 14 numeros.
    numeroIdentificacion: /^\d{7,12}$/ // de 4 a 12 digitos
}

const validarCampos = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.getElementById(`grupo_${campo}`).classList.remove('formulario_campos_incorrectos');
        document.getElementById(`grupo_${campo}`).classList.add('formulario_campos_correctos');
        document.getElementById(`mensaje_input_${campo}`).classList.remove('mensajeInfoIncorrectos');
        document.getElementById(`mensaje_input_${campo}`).classList.add('mensajeInfoCorrectos');
        document.getElementById(`mensaje_input_${campo}`).style.display = 'block';
    } else {
        document.getElementById(`grupo_${campo}`).classList.remove('formulario_campos_correctos');
        document.getElementById(`grupo_${campo}`).classList.add('formulario_campos_incorrectos');
        document.getElementById(`mensaje_input_${campo}`).classList.remove('mensajeInfoCorrectos');
        document.getElementById(`mensaje_input_${campo}`).classList.add('mensajeInfoIncorrectos');
        document.getElementById(`mensaje_input_${campo}`).style.display = 'block';
    }
}

const validarPresionTecla = (tecla) => {
    switch (tecla.target.name) {
        case 'nombre':
            validarCampos(expresiones.nombre, tecla.target, tecla.target.name);
            break;
        case 'segundo_nombre':
            validarCampos(expresiones.nombre, tecla.target, tecla.target.name);
            break;
        case 'apellido':
            validarCampos(expresiones.nombre, tecla.target, tecla.target.name);
            break;
        case 'telefono':
            validarCampos(expresiones.telefono, tecla.target, tecla.target.name);
            break;
        case 'correo':
            validarCampos(expresiones.correo, tecla.target, tecla.target.name);
            break;
        case 'numident':
            validarCampos(expresiones.numeroIdentificacion, tecla.target, tecla.target.name);
            break;
        default:
            break;
    }   
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarPresionTecla);
    input.addEventListener('blur', validarPresionTecla);
})
jQuery("#registrarUsuario").on("click", function () {
    
})
