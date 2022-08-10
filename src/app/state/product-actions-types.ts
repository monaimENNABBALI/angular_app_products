export enum ProductActionsTypes {
  GET_ALL_PRODUCTS="[Product] Get All products",
  GET_SELECTED_PRODUCTS="[Product] Get Selected products",
  GET_AVAILABLE_PRODUCTS="[Product] Get Available products",
  SEARCH_PRODUCTS="[Product] Search products",
  NEW_PRODUCTS="[Product] New products",
  SELECT_PRODUCT="[List Product] select product",
  EDIT_PRODUCT="[List Product] edit product",
  DELETE_PRODUCT="[List Product] delete product"

}
export interface ActionEvent{
  type:ProductActionsTypes;
  payload?:any
}
