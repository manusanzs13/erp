import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FacturasService } from '../../servicios/facturas.service';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-crear-fact',
  templateUrl: './crear-fact.component.html',
  styleUrls: ['./crear-fact.component.css'],
  animations: [
    trigger('alerta', [
      state('show', style({opacity: 1})),
      state('hide', style({opacity: 0})),
      transition('show => hide', animate('500ms ease-out')),
      transition('hide => show', animate('500ms ease-out'))
    ])
  ]
})
export class CrearFactComponent implements OnInit {

  @ViewChild('cif') cifRef: ElementRef;

  facturaForm: FormGroup;
  factura:any;
  mensaje:string = 'Error de conexión con el servidor';
  mostrarAlerta:boolean = false;
  enviando:boolean = false;
  
  base:number;
  tipo:number;

  importe:number;
  total:number;
  irpf:number;

  retencion:boolean = false;

  cif;

  constructor(private ff: FormBuilder,
              private facturasService: FacturasService,
              private router: Router) { }

  ngOnInit() {
    this.iniciarFormulario();
  }

  iniciarFormulario() {
    this.facturaForm = this.ff.group({
      nombre: [null, Validators.required],
      cif: ['', [Validators.required, Validators.minLength(9)]],
      fecha: null,
      concepto: null,
      base: [null, [Validators.required, Validators.max(100000)]],
      retencion: false,
      tipo: 0.21,
      irpf: this.formatearMoneda(0),
      importe: this.formatearMoneda(0),
      total: this.formatearMoneda(0)
    });
    this.detectarCambios();
  }

  get estadoAlerta() {
    return this.mostrarAlerta ? 'show' : 'hide';
  }

  crearFact() {
    this.mostrarAlerta = false;
    this.enviando = true;
    this.factura = this.guardarFact();
    console.log(this.factura);
    this.facturasService.postFactura(this.factura)
              .subscribe((resp:any)=> {
                this.router.navigate(['/listado-factura']);
                this.enviando = false;
                console.log(this.factura);
              }, error => {
                this.mostrarAlerta = true;
                this.enviando = false;
                if (error.error.errores.errors.cif.message) {
                  this.mensaje = error.error.errores.errors.cif.message;
                  this.cifRef.nativeElement.focus();
                }
              })
  }
  guardarFact() {
    const guardarFact = {
      nombre: this.facturaForm.get('nombre').value,
      cif: this.facturaForm.get('cif').value,
      fecha: this.facturaForm.get('fecha').value,
      concepto: this.facturaForm.get('concepto').value,
      base: this.facturaForm.get('base').value,
      retencion: this.facturaForm.get('retencion').value,
      tipo: this.facturaForm.get('tipo').value,
      irpf: this.facturaForm.get('irpf').value,
      importe: this.facturaForm.get('importe').value,
      total: this.facturaForm.get('total').value
    }
    return guardarFact;
  }

    redondear(valor) {
      var valor;
      if (valor < 0) {
        var resultado = Math.round(-valor * 100) / 100 * -1;
      } else {
        var resultado = Math.round(valor * 100) / 100;
      }
      return resultado;
    }
  
    formatearMoneda(valor) {
      var resultado = new Intl.NumberFormat("es-ES",{style:"currency",currency:"EUR"}).format(valor);
      return resultado;
    }
  
    detectarCambios() {
      this.facturaForm.valueChanges.subscribe(valorForm=>{
        this.cif = valorForm.cif.startsWith('A') || valorForm.cif.startsWith('B');
        this.base = this.redondear(valorForm.base);
        this.retencion = valorForm.retencion;
        this.tipo = valorForm.tipo;
        if (this.retencion) {
          this.irpf = this.redondear(this.base * -0.15);
        } else {
          this.irpf = 0;
        }
        this.importe = this.redondear(this.base * this.tipo);
        this.total = this.redondear(this.irpf + this.importe + this.base);
        this.facturaForm.value.irpf = this.formatearMoneda(this.irpf);
        this.facturaForm.value.importe = this.formatearMoneda(this.importe);
        this.facturaForm.value.total = this.formatearMoneda(this.total);
      });
    }

}
