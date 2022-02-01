import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModelDetalle } from 'src/app/model/model.detalle';
import { ModelProducto } from 'src/app/model/model.producto';
import { FacturaService } from '../../services/factura.service';
import { DetalleService } from '../../services/detalle.service';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-movie-actors',
  templateUrl: './factura-detalle.component.html',
  styleUrls: ['./factura-detalle.component.css'],
})
export class FacturaDetalleComponent implements OnInit {
  public detalles: ModelDetalle[] = [];
  public productos: ModelProducto[] = [];
  public form!: FormGroup;

  public fac_numero!: string;
  public cli_id!: number;
  public detalle: any;
  public producto: any;
  public txtSubtotal: number = 0;
  public txtIva: number = 0;
  public txtTarifa0: number = 0;
  public txtTarifa12: number = 0;
  public txtTotal: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private facturaService: FacturaService,
    private productoService: ProductoService,
    private detalleService: DetalleService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.fac_numero = params['fac_numero'];
      this.cli_id = parseInt(params['cli_id']);
    });
    this.cargarProductos();
    this.form = this.formBuilder.group({
      productoSelected: [null, [Validators.required]],
      txtCantidad: ['', [Validators.required]],
    });
  }

  public cargarProductos() {
    this.productoService
      .getProductos()
      .subscribe((productos: any) => (this.productos = productos));
  }

  get productoSelected() {
    return this.form.get('productoSelected');
  }

  public agregarProducto() {
    this.producto = this.productoSelected?.value;
  }

  public agregarDetalle() {
    let cantidad = parseInt(this.form.value.txtCantidad);
    let precio = this.producto.pro_iva
      ? parseFloat(this.producto.pro_precio) -
        parseFloat(this.producto.pro_precio) * 0.12
      : parseFloat(this.producto.pro_precio);
    let total = cantidad * precio;
    this.detalle = {
      pro_id: this.producto.pro_id,
      det_fact_cantidad: cantidad,
      det_fact_precio: precio,
      det_fact_total: total,
    };

    this.txtIva += this.producto.pro_iva
      ? this.detalle.det_fact_total * 0.12
      : 0;
    this.txtSubtotal += this.detalle.det_fact_total;
    this.producto.pro_iva
      ? (this.txtTarifa12 += this.detalle.det_fact_total)
      : (this.txtTarifa0 += this.detalle.det_fact_total);
    this.txtTotal += this.detalle.det_fact_total + this.txtIva;
    this.detalles.push(this.detalle);
  }

  public postFacturaDetalle() {
    this.facturaService
      .postFactura({
        fac_numero: this.fac_numero,
        cli_id: this.cli_id,
        fac_subtotal: this.txtSubtotal,
        fac_iva: this.txtIva,
        fac_total: this.txtTotal,
        fac_tarifa0: this.txtTarifa0,
        fac_tarifa12: this.txtTarifa12,
      })
      .subscribe((respuesta: any) => {
        console.log('Factura creada correctamente', respuesta);
        this.detalles.map((detalle: any) => {
          this.detalleService
            .postDetalle({
              fac_id: respuesta.at(0).fac_id,
              pro_id: detalle.pro_id,
              det_fac_cantidad: detalle.det_fact_cantidad,
              det_fac_precio: detalle.det_fact_precio,
              det_fac_total: detalle.det_fact_total,
            })
            .subscribe((respuesta: any) => {
              console.log('Detalle creado correctamente', respuesta);
            });
        });
        this.form.reset();
      });
  }

  public quitarDetalle(detalle: any) {
    this.detalles.map((det) => {});
    this.detalles = [
      ...this.detalles.filter((det) => det.pro_id !== detalle.pro_id),
    ];
  }
}
