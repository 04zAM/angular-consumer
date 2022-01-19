import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PizzaComponent } from './components/pizza/pizza.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IngredientsComponent } from './components/ingredients/ingredients.component';
import { PizzaIngredientsComponent } from './components/pizza-ingredients/pizza-ingredients.component';

@NgModule({
  declarations: [
    AppComponent,
    PizzaComponent,
    IngredientsComponent,
    PizzaIngredientsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
