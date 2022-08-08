import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http:HttpClient) { }
  getAllProducts():Observable<Product[]>
  {
    let host=environment.host;
    return this.http.get<Product[]>(host+"/products");
  }
  getAllSelected():Observable<Product[]>{
    let host=environment.host;
    return this.http.get<Product[]>(host+"/products?selected=true");
  }
  getAllAvailable():Observable<Product[]>{
    let host=environment.host;
    return this.http.get<Product[]>(host+"/products?available=true");
  }
  getSearchedProducts(value:any):Observable<Product[]>{
    let host=environment.host;
    return this.http.get<Product[]>(host+"/products?name_like="+value);
  }
  select(product:Product):Observable<Product>
  {
    let host=environment.host;
    product.selected=!product.selected;
    return this.http.put<Product>(host+"/products/"+product.id,product);
  }
  deleteProduct(product:Product){
    let host=environment.host;
    return this.http.delete<Product>(host+"/products/"+product.id);
  }
  saveProduct(product:Product):Observable<Product>
  {
    let host=environment.host;
    return this.http.post<Product>(host+"/products",product);
  }
  editProduct(product:Product):Observable<Product>
  {
    let host=environment.host;
    return this.http.put<Product>(host+"/products/"+product.id,product);
  }
  getProduct(id:number):Observable<Product>
  {
    let host=environment.host;
    return this.http.get<Product>(host+"/products/"+id);
  }

}
