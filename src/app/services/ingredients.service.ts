import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {

  constructor(private http:HttpClient) { }

  public getIngredients(){
    const url= `http://localhost:4000/ingredients`
    return this.http.get(url)
  }

  public deleteIngredients(ing_id:any){
    const url= `http://localhost:4000/ingredients?ing_id=`+ing_id
    return this.http.delete(url)
  }

  public postCreateIngredients(body:any){
    const url= `http://localhost:4000/ingredients`
    return this.http.post(url,body)
  }

  public putUpdateIngredients(body:any){
    const url= `http://localhost:4000/ingredients`
    return this.http.put(url,body)
  } 
}
