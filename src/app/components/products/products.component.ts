import { Product } from './../../model/product';
import { AppDataState } from './../../state/app-data-state';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { Component, OnInit} from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products:Observable<AppDataState<Product[]>>|null=null;
  constructor(private productService:ProductsService,private router:Router) { }

  ngOnInit(): void {
  }
  getAllProducts(){
this.products=this.productService.getAllProducts().pipe(
  map((data)=>{
    return (
      {dataState:"LOADED",data:data}
      )
  }
    ),
  startWith({dataState:"LOADING"}),
  catchError(err=>of({dataState:"ERROR",errorMessage:err.message})

  )

);
  }
  getProductsSelected(){
    this.products=this.productService.getAllSelected().pipe(
      map((data)=>{
      return ({dataState:"LOADED",data:data})}
      ),
      startWith({dataState:"LOADING"}),
      catchError(error=>of({dataState:"ERROR",errorMessage:error.message}))
    )
  }
  getProductsAvailable(){
    this.products=this.productService.getAllAvailable().pipe(
      map((data)=>{
      return ({dataState:"LOADED",data:data})}
      ),
      startWith({dataState:"LOADING"}),
      catchError(error=>of({dataState:"ERROR",errorMessage:error.message}))
    )
  }
  Onsearch(dataForm:any){
    this.products=this.productService.getSearchedProducts(dataForm.valueSearch).pipe(
      map((data)=>{
      return ({dataState:"LOADED",data:data})}
      ),
      startWith({dataState:"LOADING"}),
      catchError(error=>of({dataState:"ERROR",errorMessage:error.message}))
    )
  }
  Onselect(product:Product){
    this.productService.select(product).subscribe(()=>{});
  }
  delete(product:Product){
    let v=confirm("etes vous sur?");
    if(v==true){
      this.productService.deleteProduct(product).subscribe(()=>{
        this.getAllProducts();
      });
    }

  }
  newProduct(){
    this.router.navigateByUrl("/addProduct");
  }
  edit(item:Product){
    this.router.navigateByUrl("/editProduct/"+item.id);
  }
}
