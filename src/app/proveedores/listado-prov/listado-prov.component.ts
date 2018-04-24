import { Component, OnInit } from '@angular/core';
// Importamos el servicio de proveedores
import { ProveedoresService } from '../../servicios/proveedores.service';
// Elementos para una animación
import { trigger, state, style, animate, transition } from '@angular/animations';
import { AutenticacionService } from '../../servicios/autenticacion.service';

@Component({
  selector: 'app-listado-prov',
  templateUrl: './listado-prov.component.html',
  styleUrls: ['./listado-prov.component.css'],
  animations: [
    trigger('alerta', [ // Mismo nombre que la animación en el HTML
      state('show', style({opacity: 1})), // Cuando el estado es show, le ponemos opacity 1
      state('hide', style({opacity: 0})), // Cuando el estado es hide, le ponemos opacity 0
      transition('show => hide', animate('500ms ease-out')), // Como realiza la transición de estado show a hide
      transition('hide => show', animate('500ms ease-out')) // Como realiza la transición de estado hide a show
    ])
  ]
})
export class ListadoProvComponent implements OnInit {

  // Clase para traerse a los proveedores de la base de datos
  proveedores:any;
  // id del proveedor para borrarlo luego
  id:string;
  // Para los mensajes de la navegación programática
  mensaje:string = "Error de conexión con el servidor";
  mostrarAlerta:boolean = false;

  // Iniciar el servicio
  constructor(private proveedoresService: ProveedoresService,
              private autenticacionService: AutenticacionService) { }

  ngOnInit() {
    // Cargue el método cuando se inicie la app
    this.cargarProveedores();
  }

  // Método para el mensaje cuando borro un proveedor
  get estadoAlerta() {
    return this.mostrarAlerta ? 'show' : 'hide'; // Dependiendo del estado muestra el mensaje o no
  }

  // Método para llamar a los proveedores
  cargarProveedores() {
    this.proveedoresService.getProveedores()
          .subscribe((resp:any) => {
            this.proveedores = resp.proveedores;
          }, error => {
            console.log(error);
          })
  }

  obtenerId(id) {
    this.id = id;
  }

  borrarProveedor() {
    this.proveedoresService.deleteProveedor(this.id)
          .subscribe((resp:any)=> {
            // Mensaje que se muestra cuando borramos un proveedor
            this.mensaje = "El proveedor ha sido eliminado correctamente";
            this.mostrarAlerta = true;
            this.cargarProveedores();
            // Cuando pasen 3 segundos se borre el mensaje de proveedor eliminado
            setTimeout(()=> {
              this.mostrarAlerta = false;
            }, 3000);
          },(error:any)=> {
            // Vemos el error y mostramos mensaje durante 3 segundos
            if (error.error.mensaje === 'Token incorrecto') {
            this.mensaje = "Su sesión ha caducado, reinicie sesión"
            }
            this.mostrarAlerta= true;
            setTimeout(()=> {
              this.mostrarAlerta = false;
            }, 3000);
          })
    setTimeout(()=> {
      this.mensaje = "Error de conexión con el servidor";
    }, 3000);
  }

}
