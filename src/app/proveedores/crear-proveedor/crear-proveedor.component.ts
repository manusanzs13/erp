// Añadimos a lo que viene ViewChild y ElementRef
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
// Importamos las clases de FormsModule
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
// Importamos para crear un nuevo proveedor
import { ProveedoresService } from '../../servicios/proveedores.service';
// Importamos para la navegación programática
import { Router } from '@angular/router';
// Elementos para una animación
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-crear-proveedor',
  templateUrl: './crear-proveedor.component.html',
  styleUrls: ['./crear-proveedor.component.css'],
  // Array de animaciones con array de métodos
  animations: [
    trigger('alerta', [ // Mismo nombre que la animación en el HTML
      state('show', style({opacity: 1})), // Cuando el estado es show, le ponemos opacity 1
      state('hide', style({opacity: 0})), // Cuando el estado es hide, le ponemos opacity 0
      transition('show => hide', animate('500ms ease-out')), // Como realiza la transición de estado show a hide
      transition('hide => show', animate('500ms ease-out')) // Como realiza la transición de estado hide a show
    ])
  ]
})
export class CrearProveedorComponent implements OnInit {

  // Ponemos esto para que nos mande el foco al cif cuando nos salga el error de que ya existe
  @ViewChild('cif') cifRef: ElementRef;

  proveedorForm: FormGroup;
  proveedor:any;
  provincias:string[] = ['Álava','Albacete','Alicante','Almería','Asturias','Ávila','Badajoz','Barcelona','Burgos','Cáceres',
  'Cádiz','Cantabria','Castellón','Ceuta','Ciudad Real','Córdoba','La Coruña','Cuenca','Gerona','Gibraltar','Granada','Guadalajara',
  'Guipúzcoa','Huelva','Huesca','Islas Baleares','Jaén','León','Lérida','Lugo','Madrid','Málaga','Melilla','Murcia','Navarra',
  'Orense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona',
  'Santa Cruz de Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza']
  // Para los mensajes de la navegación programática
  mensaje:string = 'Error de conexión con el servidor';
  mostrarAlerta:boolean = false;
  // Para la aplicación del spinner
  enviando:boolean = false;

  constructor(private pf: FormBuilder,
              private proveedoresService: ProveedoresService,
              private router: Router) { }

  ngOnInit() {
    this.proveedorForm = this.pf.group({
      nombre: null,
      cif: null,
      domicilio: null,
      cp: null,
      localidad: null,
      provincia: null,
      telefono: null,
      email: null,
      contacto: null
    })
  }

  // Método para que salga el mensaje en caso de que se produzca error la crear un nuevo proveedor
  get estadoAlerta() {
    return this.mostrarAlerta ? 'show' : 'hide'; // Dependiendo del estado muestra el mensaje o no
  }

  crearProv() {
    // Inicializarlo en false para que no aparezca el mensaje
    this.mostrarAlerta = false;
    // Cuando enviemos se active el spinner
    this.enviando = true;
    this.proveedor = this.guardarProv();
    this.proveedoresService.postProveedor(this.proveedor)
              .subscribe((resp:any)=> {
                // Navegación programática, que nos lleve cuando creemos un proveedor
                // a la Lista de Proveedores y solo si no hay errores
                this.router.navigate(['/listado-proveedores']);
                // Se desactive después de que funcione
                this.enviando = false;
              }, error => {
                // Si se produce el error mostrar alerta pase a true
                this.mostrarAlerta = true;
                // Se desactive después de que funcione y se produzca el error
                this.enviando = false;
                // Dependiendo del tipo de error nos muestre un mensaje u otro
                if (error.error.errores.errors.cif.message) {
                  this.mensaje = error.error.errores.errors.cif.message;
                  // Nos pone el foco en el cif cuando se produce este error
                  this.cifRef.nativeElement.focus();
                }
              })
  }
  
  guardarProv() {
    const guardarProv = {
      nombre: this.proveedorForm.get('nombre').value,
      cif: this.proveedorForm.get('cif').value,
      domicilio: this.proveedorForm.get('domicilio').value,
      cp: this.proveedorForm.get('cp').value,
      localidad: this.proveedorForm.get('localidad').value,
      provincia: this.proveedorForm.get('provincia').value,
      telefono: this.proveedorForm.get('telefono').value,
      email: this.proveedorForm.get('email').value,
      contacto: this.proveedorForm.get('contacto').value
    }
    return guardarProv;
  }

}
