import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FacturasService } from '../../servicios/facturas.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-fact',
  templateUrl: './editar-fact.component.html',
  styleUrls: ['./editar-fact.component.css']
})
export class EditarFactComponent implements OnInit {

  @ViewChild('nombre')  nombreRef: ElementRef;
  @ViewChild('cif') cifRef: ElementRef;

  facturaForm: FormGroup;
  factura:any;
  id:string;

  base:number;
  tipo:number;

  importe:number;
  total:number;
  irpf:number;

  retencion:boolean = false;

  cif;

  constructor(private ff: FormBuilder,
              private facturasService: FacturasService,
              private router: Router,
              private route: ActivatedRoute) {
                if(!this.factura){
                  this.factura = {};
                }
    }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.cargarFactura(this.id);
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

  cargarFactura(id) {
    this.facturasService.getFacturaId(id)
                .subscribe((res:any) => {
                  this.factura = res.factura;
                })
  }

  editarFact() {
    this.factura = this.guardarFact();
    this.facturasService.putFactura(this.id, this.factura)
                  .subscribe((res:any)=> {
                    this.router.navigate(['/listado-factura']);
                  }, (error)=> {
                    console.log(error);
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
