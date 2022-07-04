import Citas from "./classes/Citas.js";
import UI from './classes/Ui.js';
import { mascotaInput, propietarioInput, telefonoInput, fechaInput, horaInput, sintomasInput, formulario } from "./selectores.js";
// Instanciar citas
const ui = new UI();
const administrarCitas = new Citas();


let editando;

// Objeto con la información de cita
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

    if (!mascota || !propietario || !telefono || !fecha || !hora || !sintomas) {
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');
        return;
    }

    if (editando) {
        // Mostrar mensaje
        ui.imprimirAlerta('La cita se editó correctamente', 'exito');

        // Pasar el objeto de la cita a edicion
        administrarCitas.editarCita({...citaObj}); // Se pasa una copia del objeto para que no se modifiquen los demás

        // Cambiar el texto del boton 
        formulario.querySelector('button[type="submit"]').textContent = 'Crear cita';

        // Quitar modo edicion
        editando = false;

    } else {
        // Generar un ID unico
        citaObj.id = Date.now();

        // Creando una nueva cita
        administrarCitas.agregarCita({...citaObj}); // Se pasa una copia del objeto para que no se modifiquen los demás

        // Mostar mensaje 
        ui.imprimirAlerta('La cita se agregó correctamente', 'exito');
    }

    // Reiniciar objeto para la validación
    reiniciarObjeto();

    // Resetear formulario
    formulario.reset();

    // Mostrar el HTML de las citas
    ui.imprimirCitas(administrarCitas);
}

// Reiniciar Objeto
export function reiniciarObjeto() {
    citaObj.mascota      = '';
    citaObj.propietario  = '';
    citaObj.telefono     = '';
    citaObj.fecha        = '';
    citaObj.hora         = '';
    citaObj.sintomas     = '';
}

export function eliminarCita(id) {
    // Eliminar la cita
    administrarCitas.eliminarCita(id);

    // Mostrar un mensaje
    ui.imprimirAlerta('La cita se eliminó correctamente', 'exito');

    // Refrescar las citas
    ui.imprimirCitas(administrarCitas);
}

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