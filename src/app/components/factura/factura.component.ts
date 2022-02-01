import { Component, OnInit } from '@angular/core';
import { ModelFactura } from 'src/app/model/model.factura';
import { ModelDetalle } from 'src/app/model/model.detalle';
import { ModelCliente } from 'src/app/model/model.cliente';
import { ModelProducto } from 'src/app/model/model.producto';
import { FacturaService } from '../../services/factura.service';
import { DetalleService } from '../../services/detalle.service';
import { ClienteService } from '../../services/cliente.service';
import { ProductoService } from '../../services/producto.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ventas',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css'],
})
export class FacturaComponent implements OnInit {
  public form!: FormGroup;
  public informacionFactura = {
    fac_id: -1,
    fac_numero: '',
    cli_id: -1,
    fac_estado: true,
  };

  constructor(
    private facturaService: FacturaService,
    private clienteService: ClienteService,
    private formBuilder: FormBuilder
  ) {}

  facturas: ModelFactura[] = [];
  detalles: ModelDetalle[] = [];
  clientes: ModelCliente[] = [];
  productos: ModelProducto[] = [];
  factura: any;

  ngOnInit(): void {
    this.cargarFacturas();
    this.cargarClientes();
    this.form = this.formBuilder.group({
      txtNumero: [''],
      selectedCliente: [''],
    });
    this.factura = {
      fac_numero: "Fac-001",
      cli_id: -1,
    }
  }

  public cargarFacturas() {
    this.facturaService
      .getFacturas()
      .subscribe((facturas: any) => (this.facturas = facturas));
  }

  public cargarClientes() {
    this.clienteService
      .getClientes()
      .subscribe((clientes: any) => (this.clientes = clientes));
  }

  public crearCabeceraFactura() {
    this.factura = {
      fac_numero: this.form.value.txtNumero,
      cli_id: this.form.value.selectedCliente,
    };
  }

  public crearFactura() {
    this.facturaService
      .postFactura({
        fac_numero: this.factura.fac_numero,
        cli_id: this.factura.cli_id,
      })
      .subscribe((res) => {
        console.log('Factura creada correctamente');
        this.cargarFacturas();
      });
  }
}
