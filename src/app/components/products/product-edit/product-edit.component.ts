import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ProductsService } from './../../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  formGroup?:any;
  ProductId:number;
  submitted=false;
  constructor(private routActivted:ActivatedRoute,private ProductService:ProductsService,private fb:FormBuilder) {
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
    this.ProductService.editProduct(this.formGroup.value).subscribe(()=>{})
  }

}
