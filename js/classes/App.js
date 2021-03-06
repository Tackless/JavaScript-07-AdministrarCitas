import { datosCita, nuevaCita, crearDB } from "../funciones.js";
import { 
    mascotaInput,
    propietarioInput, 
    telefonoInput, 
    fechaInput, 
    horaInput, 
    sintomasInput, 
    formulario
} from "../selectores.js";

class App {

    constructor() {

        this.initApp();
    }

    initApp() {
        mascotaInput.addEventListener('change', datosCita); // Al terminar de escribir / Dejar el focus
        // mascotaInput.addEventListener('input', datosCita); // Al ir ingresando datos
        propietarioInput.addEventListener('change', datosCita); 
        telefonoInput.addEventListener('change', datosCita); 
        fechaInput.addEventListener('change', datosCita); 
        horaInput.addEventListener('change', datosCita); 
        sintomasInput.addEventListener('change', datosCita); 

        formulario.addEventListener('submit', nuevaCita);

        crearDB();
    }
}

export default App;