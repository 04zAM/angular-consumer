import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FacturaComponent } from './components/factura/factura.component';
import { FacturaDetalleComponent } from './components/factura-detalle/factura-detalle.component';

const routes: Routes = [
 
  { path: 'factura', component: FacturaComponent },
  {
    path: 'factura-detalle/:fac_numero/:cli_id',
    component: FacturaDetalleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
