import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  ProductformGroup?:any;
  submitted:boolean=false;
  constructor(private fb:FormBuilder,private productService:ProductsService) {

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
      })
    }

  }

}
