import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ProductsService} from 'src/app/services/products.service';
import {Router} from "@angular/router";
import {EventDriverService} from "../../../state/event.driver.service";
import {ProductActionsTypes} from "../../../state/product-actions-types";

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  ProductformGroup?:any;
  submitted:boolean=false;
  constructor(private fb:FormBuilder,private productService:ProductsService,private router:Router,private EventDriver:EventDriverService) {

  }

  ngOnInit(): void {
    //creer un groupe de controle
    this.ProductformGroup=this.fb.group({
      name:['',Validators.required],
      price:[0,Validators.required],
      quantity:[0,Validators.required],
      selected:[true,Validators.required],
      available:[true,Validators.required]
    });
  }
  saveProduct(){
    this.submitted=true;
    if(this.ProductformGroup.invalid){
      return;
    }else{
      this.productService.saveProduct(this.ProductformGroup.value).subscribe(()=>{
        this.EventDriver.publishEvent({ type:ProductActionsTypes.PRODUCT_SAVED});
      });
      this.router.navigateByUrl("/products");
    }

  }

}
