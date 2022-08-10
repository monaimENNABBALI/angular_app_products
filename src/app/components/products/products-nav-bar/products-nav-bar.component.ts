import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActionEvent, ProductActionsTypes} from "../../../state/product-actions-types";
import {EventDriverService} from "../../../state/event.driver.service";

@Component({
  selector: 'app-products-nav-bar',
  templateUrl: './products-nav-bar.component.html',
  styleUrls: ['./products-nav-bar.component.css']
})
export class ProductsNavBarComponent implements OnInit {

  @Output() productEventEmitter:EventEmitter<ActionEvent>=new EventEmitter<ActionEvent>();
  constructor(private eventDriver:EventDriverService) { }

  ngOnInit(): void {
  }

  getAllProducts() {
//this.productEventEmitter.emit({type:ProductActionsTypes.GET_ALL_PRODUCTS});
    this.eventDriver.publishEvent({type:ProductActionsTypes.GET_ALL_PRODUCTS});
  }

  getProductsSelected() {
    //this.productEventEmitter.emit({type:ProductActionsTypes.GET_SELECTED_PRODUCTS});
    this.eventDriver.publishEvent({type:ProductActionsTypes.GET_SELECTED_PRODUCTS});
  }

  getProductsAvailable() {
    //this.productEventEmitter.emit({type:ProductActionsTypes.GET_AVAILABLE_PRODUCTS});
    this.eventDriver.publishEvent({type:ProductActionsTypes.GET_AVAILABLE_PRODUCTS});
  }

  search(value: any) {
//this.productEventEmitter.emit({type:ProductActionsTypes.SEARCH_PRODUCTS, payload:value});
    this.eventDriver.publishEvent({type:ProductActionsTypes.SEARCH_PRODUCTS, payload:value});
  }

  newProduct() {
  //this.productEventEmitter.emit({type: ProductActionsTypes.NEW_PRODUCTS});
  this.eventDriver.publishEvent({type: ProductActionsTypes.NEW_PRODUCTS})  ;
  }

}
