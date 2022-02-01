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
  public detalles: ModelDetalle[] = [];
  public productos: ModelProducto[] = [];
  public detalle:any;
  public form!: FormGroup;

  public fac_numero!: string;
  public cli_id!: number;

  constructor(
    private formBuilder: FormBuilder,
    private facturaService: FacturaService,
    private productoService: ProductoService,
    private detalleService: DetalleService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.fac_numero=params['fac_numero']
      this.cli_id=parseInt(params['cli_id'])      
    })
    this.cargarProductos();
    this.form = this.formBuilder.group({
      productoSelected: {},
      txtCantidad: [''],
      
    });
  }

  public cargarProductos() {
    this.productoService
      .getProductos()
      .subscribe((productos: any) => (this.productos = productos));
  }

  public agregarProducto(){

    console.table(this.form.value.productoSelected.json)
    this.detalle = {
      pro_id: this.form.value.productoSelected.pro_id,
      det_fac_cantidad: this.form.value.txtCantidad,
    }
    console.log(this.detalle)
  }

  public postFacturaDetalle() {
    this.detalleService
      .postDetalle({
        pro_id: this.detalle.pro_id,
        det_fac_cantidad: this.detalle.det_fac_cantidad,
      })
      .subscribe((respuesta) => {
        console.log('Detalle creado correctamente');
        this.form.reset();
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
