import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "../../../../model/product";
import {ActionEvent, ProductActionsTypes} from "../../../../state/product-actions-types";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() product?:Product;
  @Output() ProductItemEventEmitter:EventEmitter<ActionEvent>=new EventEmitter<ActionEvent>();
  constructor() { }

  ngOnInit(): void {
  }

  Onselect(product: Product) {
    this.ProductItemEventEmitter.emit({
      type:ProductActionsTypes.SELECT_PRODUCT,
      payload:product
    })
  }

  delete(product: Product) {
    this.ProductItemEventEmitter.emit({
      type:ProductActionsTypes.DELETE_PRODUCT,
      payload:product
    })
  }

  edit(product: Product) {
    this.ProductItemEventEmitter.emit({
      type:ProductActionsTypes.EDIT_PRODUCT,
      payload:product
    })
  }
}
