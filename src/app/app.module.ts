import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Importamos las librerias necesarias para crear las rutas
import { Routes, RouterModule } from '@angular/router';
// Importamos para poder utilizar la base de datos
import { HttpClientModule } from '@angular/common/http';
// Importamos para los formularios
import { ReactiveFormsModule } from '@angular/forms';
// Importamos para realizar las animaciones
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { ComprasComponent } from './compras/compras.component';
import { ListadoProvComponent } from './proveedores/listado-prov/listado-prov.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { ProveedoresService } from './servicios/proveedores.service';
import { CrearProveedorComponent } from './proveedores/crear-proveedor/crear-proveedor.component';
import { EditarProvComponent } from './proveedores/editar-prov/editar-prov.component';

// Declaramos la constante rutas (array) para utlizarla en el routing
const rutas:Routes = [
  // Objetos que creamos con las rutas a utilizar
  {path:'', component: InicioComponent}, // Componente que se carga al iniciar
  {path:'compras', component: ComprasComponent},
  {path:'listado-proveedores', component: ListadoProvComponent},
  {path:'crear-proveedor', component: CrearProveedorComponent},
  {path:'editar-proveedor/:id', component: EditarProvComponent}, 
  {path:'**', component: InicioComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ComprasComponent,
    ListadoProvComponent,
    CabeceraComponent,
    CrearProveedorComponent,
    EditarProvComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(rutas), // Importación
    HttpClientModule, // Importación
    ReactiveFormsModule, //Importación
    BrowserAnimationsModule // Importación
  ],
  providers: [ProveedoresService],
  bootstrap: [AppComponent]
})
export class AppModule { }
