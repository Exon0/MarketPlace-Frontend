import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductQuantity} from "../../../../../../../Models/ProductQuantity";
import {Order} from "../../../../../../../Models/Order";
import {Product} from "../../../../../../../Models/Product";
import {EventModel} from "../../../../../../../Models/EventModel";
import {Shipping} from "../../../../../../../Models/Shipping";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ProductCategory} from "../../../../../../../Models/ProductCategory";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  GetBasketProduct = 'http://localhost:8081/order/GetBasketProduct';
  GetBasketOrder = 'http://localhost:8081/order/GetBasketOrder';
  DeleteBasket = 'http://localhost:8081/order/DeleteBasket';
  UpdateQuantityInOrder = 'http://localhost:8081/order/UpdateQuantityInOrder?refProuct=&quantity=';
  DeleteProductFromOrder = 'http://localhost:8081/order/DeleteProductFromOrder?refProduct=';
  DisplayAllLastVued = 'http://localhost:8081/LastVued/DisplayAllLastVued';
  displayRunningEvents = 'http://localhost:8081/Event/displayRunningEvents'
  GetProductsForEvent = 'http://localhost:8081/Event/GetProductsForEvent?id='
  AddShippingToCard = 'http://localhost:8081/order/AddShippingToCard'
  CreateNewVued = 'http://localhost:8081/LastVued/CreateNewVued?id=';
  GetProductById = 'http://localhost:8081/order/GetProductById?id=';
  AddProductToOrder = 'http://localhost:8081/order/AddProductToOrder'
  Loyaltypoints='http://localhost:8081/Loyalty/points'
  LoyaltyToken='http://localhost:8081/Loyalty/LoyaltyToken'
  GetAllProductCategories='http://localhost:8081/productCategory/GetAllProductCategories\n'



  constructor(private http: HttpClient, public snackbar: MatSnackBar) {
  }

  options = {withCredentials: true};
  option = {withCredentials: true, responseType: 'text'};


  loadPosts() {
    return this.http.get<ProductQuantity[]>(this.GetBasketProduct, this.options);
  }

  loadOrder() {
    return this.http.get<Order>(this.GetBasketOrder, this.options);
  }

  deleteCart() {
    return this.http.delete<Order>(this.DeleteBasket, this.options);
  }

  updateQuantity(ref: string, quan: number) {
    return this.http.put<ProductQuantity>('http://localhost:8081/order/UpdateQuantityInOrder?refProuct=' + `${ref}` + '&quantity=' + `${quan}`, null, this.options)
  }

  deleteProductFromOrder(ref: string) {
    return this.http.delete<ProductQuantity>('http://localhost:8081/order/DeleteProductFromOrder?refProduct=' + `${ref}`, this.options);
  }

  searchProduct(maxprix: number, minprix: number, nameProd: string, mark: string, categorie: string, filtre: String) {

    let url = 'http://localhost:8081/order/ProductResearch?maxPrix=' + `${maxprix}` + '&minPrix=' + `${minprix}`
    if (nameProd.length > 0)
      url = url + '&nameProduct=' + `${nameProd}`;

    if (categorie.length > 0)
      url = url + '&categorie=' + `${categorie}`;
    if (mark.length > 0)
      url = url + '&mark=' + `${mark}`;

    url = url + '&productFiltre=' + `${filtre}`;
    return this.http.get<Product[]>(url, this.options);

  }

  lastVude() {
    return this.http.get<Product[]>(this.DisplayAllLastVued, this.options);
  }

  eventDisplay() {
    return this.http.get<EventModel[]>(this.displayRunningEvents, this.options);
  }

  productsInEvents(id: number) {
    return this.http.get<Product[]>(this.GetProductsForEvent + `${id}`, this.options);
  }

  addShippingToOrder(ship: Shipping) {
    return this.http.put<Order>(this.AddShippingToCard, ship, this.options);
  }

  addNewLastVuedProduct(idp: number) {
    return this.http.post(this.CreateNewVued + `${idp}`, null, this.options)
  }

  getProductById(idp: number) {
    return this.http.get<Product>(this.GetProductById + `${idp}`, this.options);
  }

  addProductToOrder(pq:ProductQuantity) {
    return this.http.put(this.AddProductToOrder,pq,this.options)
  }

  lyaltypoints()
  {
    return this.http.get<number>(this.Loyaltypoints,this.options)
  }

  loyaltyToken()
  {
    // @ts-ignore
    return this.http.get(this.LoyaltyToken,this.option);
  }

getAllProductCategories()
{
  return this.http.get<ProductCategory[]>(this.GetAllProductCategories,this.options)
}


}
