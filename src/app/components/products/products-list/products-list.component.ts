import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs";
import {AppDataState} from "../../../state/app-data-state";
import {Product} from "../../../model/product";
import {ActionEvent, ProductActionsTypes} from "../../../state/product-actions-types";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  @Input() productsInput:Observable<AppDataState<Product[]>>|null=null;
  @Output() ProductListEventEmitter:EventEmitter<ActionEvent>=new EventEmitter<ActionEvent>();
  constructor() { }

  ngOnInit(): void {

  }
  Onselect(item: Product) {
    this.ProductListEventEmitter.emit({
      type:ProductActionsTypes.SELECT_PRODUCT,
      payload:item
    })
  }

  delete(item: Product) {
    this.ProductListEventEmitter.emit({
      type:ProductActionsTypes.DELETE_PRODUCT,
      payload:item
    })
  }

  edit(item: Product) {
    this.ProductListEventEmitter.emit({
      type:ProductActionsTypes.EDIT_PRODUCT,
      payload:item
    })
  }

  onActionItem(data:any) {
    switch (data.type) {
      case ProductActionsTypes.SELECT_PRODUCT:this.Onselect(data.payload);break;
      case ProductActionsTypes.DELETE_PRODUCT:this.delete(data.payload);break;
      case ProductActionsTypes.EDIT_PRODUCT:this.edit(data.payload);break;
    }
  }
}
