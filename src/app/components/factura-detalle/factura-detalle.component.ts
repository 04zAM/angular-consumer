import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  detalles: ModelDetalle[] = [];
  productos: ModelProducto[] = [];
  public form!: FormGroup;

  //para obtener datos
  public idMovie!: number;
  public titleMovie!: '';
  public fac_id!: number;

  constructor(
    private formBuilder: FormBuilder,
    private facturaService: FacturaService,
    private productoService: ProductoService,
    private detalleService: DetalleService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((body: any) => {
      this.fac_id = parseInt(body['fac_id']);
    });
    this.cargarProductos();
    this.form = this.formBuilder.group({
      actorsSelected: [],
      actorPrincipal: false,
    });
  }

  //agregar metodos
  public cargarDetalles() {
    this.detalleService
      .getDetalle(this.fac_id)
      .subscribe((detalles: any) => (this.detalles = detalles));
  }

  public cargarProductos() {
    this.productoService
      .getProductos()
      .subscribe((productos: any) => (this.productos = productos));
  }

  public postFacturaDetalle() {
    this.detalleService
      .postDetalle({
        fac_id: this.fac_id,
        prod_id: this.form.value.productoSelected,
        det_fac_cantidad: this.form.value.txtCantidad,
      })
      .subscribe((respuesta) => {
        console.log('Detalle creado correctamente');
        this.form.reset();
        this.cargarDetalles();
      });
  }

  // public deleteDetalle(act_mov_id: any) {
  //   this.detalleService
  //     .deleteDetalle(act_mov_id)
  //     .subscribe((respuesta) => {
  //       console.log('detalle eliminado correctamente');
  //       this.cargarDetalles();
  //     });
  // }
}
