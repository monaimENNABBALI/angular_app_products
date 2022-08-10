import {FormBuilder, Validators} from '@angular/forms';
import {ProductsService} from './../../../services/products.service';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EventDriverService} from "../../../state/event.driver.service";
import {ProductActionsTypes} from "../../../state/product-actions-types";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  formGroup?:any;
  ProductId:number;
  submitted=false;
  constructor(private routActivted:ActivatedRoute,private ProductService:ProductsService,
              private fb:FormBuilder,private router:Router,
              private EventDriver:EventDriverService
              ) {
    this.ProductId=this.routActivted.snapshot.params['id'];
   }

  ngOnInit(): void {
    this.ProductService.getProduct(this.ProductId).subscribe(data=>{
      this.formGroup=this.fb.group({
        id:[data.id],
        name:[data.name,Validators.required],
      price:[data.price,Validators.required],
      quantity:[data.quantity,Validators.required],
      selected:[data.selected,Validators.required],
      available:[data.available,Validators.required]
      })
    })
  }
  editProduct(){
    this.ProductService.editProduct(this.formGroup.value).subscribe(()=>{
      this.EventDriver.publishEvent({type:ProductActionsTypes.PRODUCT_UPDATED});
    })
    this.router.navigateByUrl("/products");
  }
}
