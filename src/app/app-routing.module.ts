import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PizzaComponent } from './components/pizza/pizza.component';
import { IngredientsComponent } from './components/ingredients/ingredients.component';
import { PizzaIngredientsComponent } from './components/pizza-ingredients/pizza-ingredients.component';

const routes: Routes = [
  {path:'',component:PizzaComponent},
  { path:'pizza',component:PizzaComponent },
  { path:'ingredients',component:IngredientsComponent },
  { path:'pizza-ingredients/:piz_id/:piz_name',component:PizzaIngredientsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
