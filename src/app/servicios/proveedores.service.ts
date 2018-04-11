import { Injectable } from '@angular/core';
// Importamos para poder extraer los datos de la base de dator proveedores
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ProveedoresService {

  constructor(private http: HttpClient) { }

  getProveedores() {
    // Obtenemos los proveedores llamando a la url donde nos lo muestra el servidor backend de node-express
    let url = 'http://localhost:3000/proveedor';
    return this.http.get(url)
              .map((resp:any)=> {
                return resp;
              });
  }

  // Método para obtener un proveedor solo, por su id
  getProveedorId(id) {
    let url = 'http://localhost:3000/proveedor/';
    return this.http.get(url + id)
              .map((resp:any)=> {
                return resp;
              });
  }

  // Método para añadir un proveedor a la base de datos
  postProveedor(proveedor) {
    let url = 'http://localhost:3000/proveedor';
    return this.http.post(url, proveedor)
                .map((resp:any)=> {
                  console.log(resp);
                  return resp;
                })
  }

  // Método para actualizar los proveedores en la base de datos
  putProveedor(id, proveedor) {
    let url = 'http://localhost:3000/proveedor/';
    return this.http.put(url + id, proveedor)
                .map((resp:any)=> {
                  return resp;
                });
  }

  // Método paara borrar un proveedor de la base de datos
  deleteProveedor(id) {
    let url = 'http://localhost:3000/proveedor/';
    return this.http.delete(url + id)
                .map((resp:any)=> {
                  return resp;
                });
  }

}
