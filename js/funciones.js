'use strict';
import Citas from './clases/Citas.js';
import UI from './clases/UI.js';

import {
    mascotaInput,
    propietarioInput,
    telefonoInput,
    fechaInput,
    horaInput,
    sintomasInput,
    formulario
} from './selectores.js'


const ui = new UI();
const administrarCitas = new Citas();

let editando = false;

// Objeto la información de la cita
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

// Agrega datos al objeto de cita
export function datosCita(e) {
    citaObj[e.target.name] = e.target.value;

}


// Valida y agrega una nueva cita a la clase de citas
export function nuevaCita(e) {
    e.preventDefault();

    // Extraer la información del objeto de cita
    const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

    // Validar 
    if (mascota === '' ||
        propietario === '' ||
        telefono === '' ||
        fecha === '' ||
        hora === '' ||
        sintomas === ''
    ) {
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');

        return;
    }

    if (editando) {
        ui.imprimirAlerta('La cita se modifico correctamente');

        // Pasar el objeto de la cita actualizado
        administrarCitas.editarCita({ ...citaObj });

        // Cambiar el texto del boton a su estado original
        formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita';

        // Quitar modo edicion
        editando = false;

    } else {
        // Generar un id único para cada cita 
        citaObj.id = Date.now();

        // Crear una nueva cita 
        administrarCitas.agregarCita({ ...citaObj });

        // Imprimir mensaje de agregado correctamente
        ui.imprimirAlerta('La cita se agrego correctamente');
    }

    // Reiniciar el objeto para la validación
    reiniciarObj();


    // Reiniciar el formulario 
    formulario.reset();

    // Mostrar en el HTML las citas
    ui.imprimirCitas(administrarCitas);
}

// Reiniciar el objeto 
export function reiniciarObj() {
    citaObj.mascota = '',
        citaObj.propietario = '',
        citaObj.telefono = '',
        citaObj.fecha = '',
        citaObj.hora = '',
        citaObj.sintomas = ''
}

export function elimimarCita(id) {
    // Eliminar la  cita
    administrarCitas.elimimarCita(id);

    // Mostrar un mensaje
    const contenedorCitas = document.querySelector('#citas'); ui.imprimirAlerta('La cita se elimino correctamente')

    // Actualizar las citas 
    ui.imprimirCitas(administrarCitas);
}

// Carga los datos y el modo edicion
export function cargarEdicion(cita) {
    const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

    // Llenar los inputs
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    // Llenar el objeto
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    // Cambiar el texto del boton
    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';

    editando = true;

}