import {Product} from './../../model/product';
import {AppDataState} from './../../state/app-data-state';
import {catchError, map, Observable, of, startWith} from 'rxjs';
import {Component, OnInit} from '@angular/core';
import {ProductsService} from 'src/app/services/products.service';
import {Router} from '@angular/router';
import {ActionEvent, ProductActionsTypes} from "../../state/product-actions-types";
import {EventDriverService} from "../../state/event.driver.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products:Observable<AppDataState<Product[]>>|null=null;
  constructor(private productService:ProductsService,private router:Router,private eventDriver:EventDriverService) { }

  ngOnInit(): void {
    this.eventDriver.sourceEventSubjectObservable.subscribe((event)=>{
      this.NavAction(event);
      this.ListAction(event);
    })
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

  NavAction($event: ActionEvent) {
      switch ($event.type) {
        case ProductActionsTypes.GET_ALL_PRODUCTS:this.getAllProducts();break;
        case ProductActionsTypes.GET_SELECTED_PRODUCTS:this.getProductsSelected();break;
        case ProductActionsTypes.GET_AVAILABLE_PRODUCTS:this.getProductsAvailable();break;
        case ProductActionsTypes.SEARCH_PRODUCTS:this.Onsearch($event.payload);break;
        case ProductActionsTypes.NEW_PRODUCTS:this.newProduct();break;
      }
  }

  ListAction($event: ActionEvent) {
    switch ($event.type) {
      case ProductActionsTypes.SELECT_PRODUCT:this.Onselect($event.payload);break;
      case ProductActionsTypes.DELETE_PRODUCT:this.delete($event.payload);break;
      case ProductActionsTypes.EDIT_PRODUCT:this.edit($event.payload);break;
    }
  }
}
