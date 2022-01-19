import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PizzaIngredientsService {

  constructor(private http:HttpClient) { }

  //agregar metodos
  public getPizzaIngredients(piz_id:any){
    const url=`http://localhost:4000/pizzas_ingredients/`+piz_id
    return this.http.get(url)
  }

  public postPizzaIngredients(body:any){
    const url=`http://localhost:4000/pizzas_ingredients/`
    return this.http.post(url,body)
  }

  public deletePizzaIngredients(piz_ing_id:any){
    const url=`http://localhost:4000/pizzas_ingredients?piz_ing_id=`+piz_ing_id
    return this.http.delete(url)
  }

}
