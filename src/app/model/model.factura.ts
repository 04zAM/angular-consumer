export interface ModelFactura {
  fac_id: number;
  fac_numero: string;
  cli_id: number;
  fac_subtotal: number;
  fac_iva: number;
  fac_total: number;
  fac_tarifa0: number;
  fac_tarifa12: number;
  fac_estado: boolean;
}
