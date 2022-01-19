import { Component, OnInit } from '@angular/core';
import { PizzaIngredientsService } from 'src/app/service/pizza-ingredients.service';
import { ModelPizzaIngredients } from 'src/app/model/model.pizza-ingredients';
import { FormBuilder,FormGroup } from '@angular/forms';
import { ModelIngredients } from 'src/app/model/model.ingredients';
import { IngredientsService } from 'src/app/service/ingredients.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pizza-ingredients',
  templateUrl: './pizza-ingredients.component.html',
  styleUrls: ['./pizza-ingredients.component.css']
})
export class PizzaIngredientsComponent implements OnInit {

  PizzasI : ModelPizzaIngredients []=[]
  ingredients:ModelIngredients []=[]
  public form!:FormGroup

  //para obtener datos 
  public idPizza!:number
  public nombrePizza!:""
  public idIngredient!:number

  constructor(private formBuilder:FormBuilder, 
    private pizzaIngredientsService:PizzaIngredientsService,
    private ingredientsService:IngredientsService,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params=>{
        this.idPizza=parseInt(params['piz_id'])
        this.nombrePizza=params['piz_name']
      }
    )
    this.cargarPizzaIngredients()
    this.cargarIngredients()
    this.form=this.formBuilder.group({
      ingredientsSelected:[]
    })
  }

  //agregar metodos
  public cargarPizzaIngredients(){
    this.pizzaIngredientsService.getPizzaIngredients(
      this.idPizza
    ).subscribe(
      //pasar parametros
      (pizzaIngredients:any)=>{
        this.PizzasI=pizzaIngredients
        console.log(this.PizzasI);
      },(error)=>console.warn(error)
    )
  }

  public cargarIngredients(){
    this.ingredientsService.getIngredients().subscribe(
      (ingredient:any)=>{
        this.ingredients=ingredient
        console.log(this.ingredients)
      },
      (error)=>console.log(error)
    )
  }

  public postPizzaIngredients(){
    this.pizzaIngredientsService.postPizzaIngredients({
      piz_id:this.idPizza,
      ing_id:this.form.value.ingredientsSelected
    }).subscribe(
      respuesta=>{
        console.log('Pizza Ingredients creado correctamente')
        this.form.reset()
        this.cargarPizzaIngredients()
      }
    )
  }

  public deletePizzaIngredients(piz_ing_id:any){
    this.pizzaIngredientsService.deletePizzaIngredients(piz_ing_id).subscribe(
      respuesta=>{
        console.log('Pizza Ingredients eliminado correctamente')
        this.cargarPizzaIngredients()
      }
    )
  }

}
