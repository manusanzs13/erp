import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from '../../servicios/autenticacion.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-listado-usuario',
  templateUrl: './listado-usuario.component.html',
  styleUrls: ['./listado-usuario.component.css'],
  animations: [
    trigger('formulario', [
      state('show', style({
        opacity: 1,
        height: 80
      })),
      state('hide', style({
        opacity: 0,
        height: 0
      })), 
      transition('show => hide', animate('500ms ease-out')),
      transition('hide => show', animate('500ms ease-out'))
    ]),
    trigger('alerta', [
      state('show', style({opacity: 1})),
      state('hide', style({opacity: 0})), 
      transition('show => hide', animate('500ms ease-out')),
      transition('hide => show', animate('500ms ease-out'))
    ])
  ]
})
export class ListadoUsuarioComponent implements OnInit {

  usuarios:any;
  usuario:any;
  nuevoUsuario:any;
  crearUsuarioForm: FormGroup;
  editarUsuarioForm: FormGroup;
  mostrarFormulario:boolean = false;
  mostrarAlerta:boolean = false;
  enviando:boolean = false;
  mensaje:string = "Error de conexión al servidor";
  editarFila:string;
  id:string;

  constructor(private autenticacionService: AutenticacionService,
              private cuf: FormBuilder,
              private euf: FormBuilder) { }

  ngOnInit() {
    this.cargarUsuarios();
    this.crearUsuarioForm = this.cuf.group({
      nombre: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required],
      rol: [null, Validators.required]
    })
    this.editarUsuarioForm = this.euf.group({
      nombre: [null, Validators.required],
      email: [null, Validators.required],
      rol: [null, Validators.required]
    })
  }

  get estadoFormulario() {
    return this.mostrarFormulario ? 'show' : 'hide';
  }

  get estadoAlerta() {
    return this.mostrarAlerta ? 'show' : 'hide';
  }

  verFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  cargarUsuarios() {
    this.autenticacionService.getUsuarios()
                .subscribe((res:any)=> {
                  this.usuarios = res.usuarios;
                }, (error)=> {
                  console.log(error);
                })
  }

  crearUsuario() {
    this.enviando = true;
    this.nuevoUsuario = this.guardarNuevoUsuario();
    this.autenticacionService.postUsuario(this.nuevoUsuario)
                .subscribe((resp:any)=> {
                  this.enviando = false;
                  this.mostrarAlerta = true;
                  this.mensaje = "Usuario creado correctamente";
                  this.crearUsuarioForm.reset();
                  this.cargarUsuarios();
                  setTimeout(()=> {
                    this.mostrarAlerta = false;
                  }, 3000);
                  setTimeout(()=> {
                    this.mensaje = "Error de conexión al servidor";
                  }, 5000);
                }, (error:any)=> {
                  this.mostrarAlerta = true;
                  this.enviando = false;
                  if (error.error.errores.errors.email.message) {
                    this.mensaje = error.error.errores.errors.email.message;
                  }
                  setTimeout(()=> {
                    this.mostrarAlerta = false;
                  }, 3000);
                  setTimeout(()=> {
                    this.mensaje = "Error de conexión con el servidor";
                  }, 5000);
                })
  }
  guardarNuevoUsuario() {
    const guardarNuevoUsuario = {
      nombre: this.crearUsuarioForm.get('nombre').value,
      email: this.crearUsuarioForm.get('email').value.toLowerCase(),
      password: this.crearUsuarioForm.get('password').value,
      rol: this.crearUsuarioForm.get('rol').value
    }
    return guardarNuevoUsuario;
  }

  modificarUsuario(id) {
    this.editarFila = id;
  }

  cancelarEdicion() {
    this.editarFila = '';
    this.cargarUsuarios();
  }

  editarUsuario(id) {
    this.enviando = true;
    this.usuario = this.guardarUsuarioEditado();
    this.autenticacionService.putUsuario(id, this.usuario)
                    .subscribe((resp:any)=> {
                      this.enviando = false;
                      this.mostrarAlerta = true;
                      this.mensaje = "Usuario actualizado correctamente";
                      this.editarFila = '';
                      this.cargarUsuarios();
                      setTimeout(()=> {
                        this.mostrarAlerta = false;
                      }, 3000);
                    }, (error:any)=> {
                      this.mostrarAlerta = true;
                      this.enviando = false;
                      if (error.error.errores.errors.email.message) {
                        this.mensaje = error.error.errores.errors.email.message;
                      }
                      setTimeout(()=> {
                        this.mostrarAlerta = false;
                      }, 3000);
                    })
  setTimeout(()=> {
  this.mensaje = "Error de conexión al servidor";
  }, 5000);              
  }
  guardarUsuarioEditado() {
    const guardarUsuarioEditado = {
      nombre: this.editarUsuarioForm.get('nombre').value,
      email: this.editarUsuarioForm.get('email').value,
      rol: this.editarUsuarioForm.get('rol').value
    }
    return guardarUsuarioEditado;
  }

  getId(id) {
    this.id = id;
  }

  borrarUsuario() {
    this.enviando = true;
    this.autenticacionService.deleteUsuario(this.id)
                  .subscribe((resp:any)=> {
                    this.enviando = false;
                    this.mostrarAlerta = true;
                    this.mensaje = "Usuario eliminado correctamente";
                    this.crearUsuarioForm.reset();
                    this.cargarUsuarios();
                    setTimeout(()=> {
                      this.mostrarAlerta = false;
                    }, 3000);
                  }, (error:any)=> {
                    this.mostrarAlerta = true;
                    this.enviando = false;
                    setTimeout(()=> {
                      this.mostrarAlerta = false;
                    }, 3000);
                  })
    setTimeout(()=> {
      this.mensaje = "Error de conexión al servidor";
    }, 5000);              
  }

}
