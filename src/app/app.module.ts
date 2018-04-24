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
import { ListadoFactComponent } from './facturas/listado-fact/listado-fact.component';
import { EditarFactComponent } from './facturas/editar-fact/editar-fact.component';
import { CrearFactComponent } from './facturas/crear-fact/crear-fact.component';
import { FacturasService } from './servicios/facturas.service';
import { RegistroComponent } from './autenticacion/registro/registro.component';
import { AutenticacionService } from './servicios/autenticacion.service';
import { LoginComponent } from './autenticacion/login/login.component';
import { VentasComponent } from './ventas/ventas.component';
import { ListadoClientComponent } from './clientes/listado-client/listado-client.component';
import { ClientesService } from './servicios/clientes.service';
import { CrearClientesComponent } from './clientes/crear-clientes/crear-clientes.component';
import { EditarClientComponent } from './clientes/editar-client/editar-client.component';
import { AutenticacionGuard } from './servicios/autenticacion.guard';
import { ListadoUsuarioComponent } from './autenticacion/listado-usuario/listado-usuario.component';

// Declaramos la constante rutas (array) para utlizarla en el routing
const rutas:Routes = [
  // Objetos que creamos con las rutas a utilizar y las protejemos para que no se pueda entrar sin estar logueado
  {path:'', component: InicioComponent}, // Componente que se carga al iniciar
  {path:'registro', component: RegistroComponent},
  {path:'inicio-sesion', component: LoginComponent},
  {path:'compras', component: ComprasComponent, canActivate: [AutenticacionGuard]},
  {path:'listado-usuarios', component: ListadoUsuarioComponent, canActivate: [AutenticacionGuard]},
  {path:'ventas', component: VentasComponent, canActivate: [AutenticacionGuard]},
  {path:'listado-proveedores', component: ListadoProvComponent, canActivate: [AutenticacionGuard]},
  {path:'crear-proveedor', component: CrearProveedorComponent, canActivate: [AutenticacionGuard]},
  {path:'editar-proveedor/:id', component: EditarProvComponent, canActivate: [AutenticacionGuard]},
  {path:'listado-factura', component: ListadoFactComponent, canActivate: [AutenticacionGuard]},
  {path:'crear-factura', component: CrearFactComponent, canActivate: [AutenticacionGuard]},
  {path:'editar-factura/:id', component: EditarFactComponent, canActivate: [AutenticacionGuard]},
  {path:'listado-clientes', component: ListadoClientComponent, canActivate: [AutenticacionGuard]},
  {path:'crear-cliente', component: CrearClientesComponent, canActivate: [AutenticacionGuard]},
  {path:'editar-cliente/:id', component: EditarClientComponent, canActivate: [AutenticacionGuard]}, 
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
    EditarProvComponent,
    ListadoFactComponent,
    EditarFactComponent,
    CrearFactComponent,
    RegistroComponent,
    LoginComponent,
    VentasComponent,
    ListadoClientComponent,
    CrearClientesComponent,
    EditarClientComponent,
    ListadoUsuarioComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(rutas), // Importación
    HttpClientModule, // Importación
    ReactiveFormsModule, //Importación
    BrowserAnimationsModule // Importación
  ],
  providers: [ProveedoresService, FacturasService, AutenticacionService, ClientesService, AutenticacionGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
