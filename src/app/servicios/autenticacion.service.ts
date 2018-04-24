import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Router } from '@angular/router';

@Injectable()
export class AutenticacionService {

  token:string;
  nombre:string;
  rol:string;

  constructor(private http: HttpClient,
              private router: Router) {
    this.cargarCredenciales();
  }

  getUsuarios() {
    let url = 'http://localhost:3000/usuario';
    return this.http.get(url)
              .map((resp:any)=> {
                return resp;
              });
  }

  postUsuario(usuario) {
    let url = 'http://localhost:3000/usuario';
    return this.http.post(url, usuario)
                .map((resp:any)=> {
                  return resp;
                })
  }

  putUsuario(id, usuario) {
    let url = 'http://localhost:3000/usuario/';
    return this.http.put(url + id, usuario)
                .map((resp:any)=> {
                  return resp;
                })
  }

  deleteUsuario(id) {
    let url = 'http://localhost:3000/usuario/';
    return this.http.delete(url + id)
                .map((resp:any)=> {
                  return resp;
                });
  }

  login(usuario) {
    let url = 'http://localhost:3000/login';
    return this.http.post(url, usuario)
                .map((resp:any)=> {
                  this.guardarCredenciales(resp.token, resp.nombre, resp.rol);
                  return resp;
                })
  }

  // Guardar el token para utilizarlo en la página, lo guardamos en localStorage
  guardarCredenciales(token, nombre, rol) {
    localStorage.setItem('token',token);
    localStorage.setItem('nombre',nombre);
    localStorage.setItem('rol',rol);
    this.token = token;
    this.nombre = nombre;
    this.rol = rol;
  }

  cargarCredenciales() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.nombre = localStorage.getItem('nombre');
      this.rol = localStorage.getItem('rol');
    } else {
      this.token = '';
      this.nombre = '';
      this.rol = '';
    }
  }

  isLogged() {
    return (this.token.length > 0) ? true : false;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('nombre');
    localStorage.removeItem('rol');
    this.token = '';
    this.nombre = '';
    this.rol = '';
    this.router.navigate(['/']);
  }


  getPermLisUsuarios() {
    if(this.rol === 'Administrador') {
      return true;
    } else {
      return false;
    }
  }

  getPermCompras() {
    if(this.rol === 'Administrador' || this.rol === 'Director de Compras' || this.rol === 'Empleado de Compras') {
      return true;
    } else {
      return false;
    }
  }

  getPermProveedores() {
    if(this.rol === 'Administrador' || this.rol === 'Director de Compras') {
      return true;
    } else {
      return false;
    }
  }

}
