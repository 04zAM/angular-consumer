import { Component, OnInit } from '@angular/core';
import { ModelPizza } from 'src/app/model/model.pizza';
import {PizzaService} from '../../service/pizza.service';
import { FormBuilder,FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.css']
})
export class PizzaComponent implements OnInit {
  
  public form! :FormGroup;
  public informacionPizza={
    piz_id:-1,
    piz_name:"",
    piz_origin:"",
    piz_state:true
  }

  constructor(private pizzaService:PizzaService, private formBuilder:FormBuilder ) { }

  pizzas:ModelPizza []=[];

  ngOnInit(): void {
    this.cargarPizza();
    this.form=this.formBuilder.group({
      txtname:[''],
      txtorigin:[''],
      txtstate:[true],
    })
  }

  public cargarPizza(){
    this.pizzaService.getPizza().subscribe(
      (pizza:any)=>{
        this.pizzas=pizza
        console.log(this.pizzas)
      },(error)=>console.log(error)
    )
  }

  public crearPizza(){
    this.pizzaService.postCreatePizza({
      piz_name:this.form.value.txtname,
      piz_origin:this.form.value.txtorigin,
      piz_state:this.form.value.txtstate
    }).subscribe(res=>{
      console.log('Pizza creada correctamente')
      this.cargarPizza()
    })
  }

  public eliminarPizza(piz_id:any){
    this.pizzaService.deletePizza(piz_id).subscribe(
      res=>console.log('Pizza eliminada correctamente'))
      this.cargarPizza()
  }

  public actualizarPizza(piz_id:any){
    this.pizzaService.putUpdatePizza({
      piz_id:piz_id,
      piz_name:this.form.value.txtname,
      piz_origin:this.form.value.txtorigin,
      piz_state:this.form.value.txtstate,
    }).subscribe(res=>{
      console.log('Pizza actualizada correctamente.')
      this.cargarPizza()
    })
  }

  public infoUpdatePizza(piz_id:any,piz_name:any,piz_origin:any,piz_state:any){
    this.informacionPizza.piz_id=piz_id;
    this.informacionPizza.piz_name=piz_name;
    this.informacionPizza.piz_origin=piz_origin;
    this.informacionPizza.piz_state=piz_state;
  }

}
