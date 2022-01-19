import { Component, OnInit } from '@angular/core';
import { ModelIngredients } from 'src/app/model/model.ingredients';
import { IngredientsService } from 'src/app/service/ingredients.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {

  ingredients: ModelIngredients [] = [];
  
  public form! : FormGroup;
 
  public informacionIngredients={
    ing_id:-1,
    ing_name:"",
    ing_calories:"",
    ing_state:true
  }

  constructor(private ingredientsService:IngredientsService,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.cargarIngredients();
    this.form=this.formBuilder.group({
      txtname:[''],
      txtcalories:[''],
      txtstate:[true]
    })
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

  public crearIngredients(){
    this.ingredientsService.postCreateIngredients({
      ing_name:this.form.value.txtname,
      ing_calories:this.form.value.txtcalories,
      ing_state:this.form.value.txtstate,
    }).subscribe(res=>{
      console.log('Ingredients creado correctamente')
      this.cargarIngredients()
    })
  }

  public eliminarIngredients(ing_id:any){
    this.ingredientsService.deleteIngredients(ing_id).subscribe(res=>{
      console.log('Ingredients eliminado correctamente')
      this.cargarIngredients()
    })
  }

  public actualizarIngredients(ing_id:any){
    this.ingredientsService.putUpdateIngredients({
      ing_id:ing_id,
      ing_name:this.form.value.txtname,
      ing_calories:this.form.value.txtcalories,
      ing_state:this.form.value.txtstate
    }).subscribe(res=>{
      console.log('Ingredients actualizado correctamente')
      this.cargarIngredients();
    })
  }

  public infoUpdateIngredients(ing_id: any,ing_name: any,ing_calories: any,ing_state: any){
    this.informacionIngredients.ing_id=ing_id;
    this.informacionIngredients.ing_name=ing_name;
    this.informacionIngredients.ing_calories=ing_calories;
    this.informacionIngredients.ing_state=ing_state;
  }

}
