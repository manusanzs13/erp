import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientesService } from '../../servicios/clientes.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-client',
  templateUrl: './editar-client.component.html',
  styleUrls: ['./editar-client.component.css']
})
export class EditarClientComponent implements OnInit {

  clienteForm: FormGroup;
  cliente:any;
  provincias:string[] = ['Álava','Albacete','Alicante','Almería','Asturias','Ávila','Badajoz','Barcelona','Burgos','Cáceres',
  'Cádiz','Cantabria','Castellón','Ceuta','Ciudad Real','Córdoba','La Coruña','Cuenca','Gerona','Gibraltar','Granada','Guadalajara',
  'Guipúzcoa','Huelva','Huesca','Islas Baleares','Jaén','León','Lérida','Lugo','Madrid','Málaga','Melilla','Murcia','Navarra',
  'Orense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona',
  'Santa Cruz de Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza']
  id:string;

  constructor(private cf: FormBuilder,
              private clientesService: ClientesService,
              private router: Router,
              private route: ActivatedRoute) {
                if(!this.cliente){
                  this.cliente = {};
                }
            }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.cargarCliente(this.id);
    this.clienteForm = this.cf.group({
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

  cargarCliente(id) {
    this.clientesService.getClienteId(id)
                .subscribe((res:any) => {
                  this.cliente = res.cliente;
                  console.log(this.cliente);
                })
  }

  editarClient() {
    this.cliente = this.guardarClient();
    // Cuando demos a guardar nos guarde los cambios
    this.clientesService.putCliente(this.id, this.cliente)
                  .subscribe((res:any)=> {
                    this.router.navigate(['/listado-clientes']);
                  })
  }
  guardarClient() {
    const guardarClient = {
      nombre: this.clienteForm.get('nombre').value,
      cif: this.clienteForm.get('cif').value,
      domicilio: this.clienteForm.get('domicilio').value,
      cp: this.clienteForm.get('cp').value,
      localidad: this.clienteForm.get('localidad').value,
      provincia: this.clienteForm.get('provincia').value,
      telefono: this.clienteForm.get('telefono').value,
      email: this.clienteForm.get('email').value,
      contacto: this.clienteForm.get('contacto').value
    }
    return guardarClient;
  }

}
