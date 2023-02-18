const formulario = document.getElementById("formulario")
const inputs = document.querySelectorAll("#formulario input")

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

const campos = {
    usuario: false,
    nombre: false,
    password: false,
    correo: false,
    telefono: false
}

const validarCampo = (expresion, input, campo) => {
    if(expresion.test(input.value)) {
        document.getElementById(`grupo-${campo}`).classList.remove("formulario-grupo-incorrecto")
        document.getElementById(`grupo-${campo}`).classList.add("formulario-grupo-correcto")
        document.querySelector(`#grupo-${campo} i`).classList.remove("fa-circle-xmark")
        document.querySelector(`#grupo-${campo} i`).classList.add("fa-circle-check")
        document.querySelector(`#grupo-${campo} .input-error`).classList.remove("activo")
        document.querySelector(`#grupo-${campo} .input-error`).classList.add("inactivo")
        campos[campo] = true
    } else { 
        document.getElementById(`grupo-${campo}`).classList.add("formulario-grupo-incorrecto")
        document.getElementById(`grupo-${campo}`).classList.remove("formulario-grupo-correcto")
        document.querySelector(`#grupo-${campo} i`).classList.add("fa-circle-xmark")
        document.querySelector(`#grupo-${campo} i`).classList.remove("fa-circle-check")
        document.querySelector(`#grupo-${campo} .input-error`).classList.add("activo")
        document.querySelector(`#grupo-${campo} .input-error`).classList.remove("inactivo")
        campos[campo] = false
    }
}

const validarContraseña2  = () => {
    const inputContraseña1 = document.getElementById("contraseña")
    const inputContraseña2 = document.getElementById("contraseña2")

    if(inputContraseña1.value === inputContraseña2.value) {
        document.getElementById(`grupo-contraseña2`).classList.remove("formulario-grupo-incorrecto")
        document.getElementById(`grupo-contraseña2`).classList.add("formulario-grupo-correcto")
        document.querySelector(`#grupo-contraseña2 i`).classList.remove("fa-circle-xmark")
        document.querySelector(`#grupo-contraseña2 i`).classList.add("fa-circle-check")
        document.querySelector(`#grupo-contraseña2 .input-error`).classList.remove("activo")
        document.querySelector(`#grupo-contraseña2 .input-error`).classList.add("inactivo")
        campos["password"] = true
    } else {
        document.getElementById(`grupo-contraseña2`).classList.add("formulario-grupo-incorrecto")
        document.getElementById(`grupo-contraseña2`).classList.remove("formulario-grupo-correcto")
        document.querySelector(`#grupo-contraseña2 i`).classList.add("fa-circle-xmark")
        document.querySelector(`#grupo-contraseña2 i`).classList.remove("fa-circle-check")
        document.querySelector(`#grupo-contraseña2 .input-error`).classList.add("activo")
        document.querySelector(`#grupo-contraseña2 .input-error`).classList.remove("inactivo")
        campos["password"] = false
    }
}

const validarFormulario = (input) => {
    switch (input.target.name) {
        case "usuario":
            validarCampo(expresiones.usuario, input.target, input.target.name)
        break
        case "nombre":
            validarCampo(expresiones.nombre, input.target, input.target.name)
        break
        case "contraseña":
            validarCampo(expresiones.password, input.target, input.target.name)
            validarContraseña2()
        break
        case "contraseña2":
            validarContraseña2()
        break
        case "correo":
            validarCampo(expresiones.correo, input.target, input.target.name)
        break
        case "telefono":
            validarCampo(expresiones.telefono, input.target, input.target.name)
        break
    }
}

inputs.forEach((input) => {
    input.addEventListener("keyup", validarFormulario)
    input.addEventListener("blur", validarFormulario)
})

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault()
    const terminos = document.getElementById("terminos")

    if(campos.usuario && campos.nombre && campos.password && campos.correo && campos.telefono && terminos.checked) {
        formulario.reset()

        document.getElementById("grupo-mensaje").classList.add("inactivo")

        document.getElementById("mensaje-exito").classList.remove("inactivo")
        setTimeout(() => {
            document.getElementById("mensaje-exito").classList.add("inactivo")
        }, 5000)

        document.querySelectorAll(".formulario-grupo-correcto").forEach((icono) => {
            icono.classList.remove("formulario-grupo-correcto")
        })
    } else {
        document.getElementById("grupo-mensaje").classList.remove("inactivo")
    }
})