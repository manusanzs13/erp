import { Component, OnInit } from '@angular/core';
// Importamos las clases de FormsModule
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
// Importamos para crear un nuevo proveedor
import { ProveedoresService } from '../../servicios/proveedores.service';
// Importamos para la navegación programática
import { Router, ActivatedRoute } from '@angular/router';
import { AutenticacionService } from '../../servicios/autenticacion.service';

@Component({
  selector: 'app-editar-prov',
  templateUrl: './editar-prov.component.html',
  styleUrls: ['./editar-prov.component.css']
})
export class EditarProvComponent implements OnInit {

  proveedorForm: FormGroup;
  proveedor:any;
  provincias:string[] = ['Álava','Albacete','Alicante','Almería','Asturias','Ávila','Badajoz','Barcelona','Burgos','Cáceres',
  'Cádiz','Cantabria','Castellón','Ceuta','Ciudad Real','Córdoba','La Coruña','Cuenca','Gerona','Gibraltar','Granada','Guadalajara',
  'Guipúzcoa','Huelva','Huesca','Islas Baleares','Jaén','León','Lérida','Lugo','Madrid','Málaga','Melilla','Murcia','Navarra',
  'Orense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona',
  'Santa Cruz de Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza']
  id:string;

  constructor(private pf: FormBuilder,
              private proveedoresService: ProveedoresService,
              private router: Router,
              private route: ActivatedRoute,
              private autenticacionService: AutenticacionService) {
                // Si cuando cargue la página el proveedor no tiene valor entonces le decimos que está vacio
                // y así nos carga sobre eso y no nos aparece el error de que está undefined
                if(!this.proveedor){
                  this.proveedor = {};
                }
              }

  ngOnInit() {
    // Cuando cargue lee lo que está en la barra de navegación
    // y coge el id que viene en esa barra
    this.id = this.route.snapshot.params['id'];
    this.cargarProveedor(this.id);
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

  // Método para cargar el proveedor con los datos que tengo de cada unos de ellos
  cargarProveedor(id) {
    this.proveedoresService.getProveedorId(id)
                .subscribe((res:any) => {
                  this.proveedor = res.proveedor;
                  console.log(this.proveedor);
                })
  }

  editarProv() {
    this.proveedor = this.guardarProv();
    // Cuando demos a guardar nos guarde los cambios
    this.proveedoresService.putProveedor(this.id, this.proveedor)
                  .subscribe((res:any)=> {
                    this.router.navigate(['/listado-proveedores']);
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
