import { Component } from '@angular/core';
import {HomeService} from "../services/home.service";
import {ProductQuantity} from "../../../../../../../Models/ProductQuantity";
import {Order} from "../../../../../../../Models/Order";
import {Router} from "@angular/router";
import {Shipping} from "../../../../../../../Models/Shipping";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css','../../../../assets/layout/styles/theme/lara-light-indigo/theme.css','../../../../assets/front-template/css/vendor.css','../../../../assets/front-template/css/utility.css','../../../../assets/front-template/css/app.css']
})
/**
 * @title Snack-bar with configurable position
 */
export class CartComponent {



  selectedValue!: string;
  requestOrder!:Order;
  form:any={};
  shipping!:Shipping;
  order!:Order;

  constructor(private router : Router,private home:HomeService,private snackBar: MatSnackBar) {
  }

  refresh() {
    const currentUrl = window.location.href;
    // @ts-ignore
    window.history.replaceState(null, null, currentUrl);
    window.location.reload();
  }
  ngOnInit()
  {
    this.getListProduct();
    this.getBaskerOrder();
  }



  addForm() {
    for (let i = 0; i < this.city.length; i++) {
      if (this.city[i].cities.includes(this.form.city)) {
        this.form.governorate = this.city[i].name;
      }
    }
    this.home.addShippingToOrder(this.form).subscribe(data =>{this.order=data;this.refresh();});
  }



  request!:ProductQuantity[];
  getListProduct(){
    this.home.loadPosts().subscribe(data =>{this.request=data;});
  }


  getBaskerOrder(){
    this.home.loadOrder().subscribe(data=> {this.requestOrder=data})
  }

  deleteCarte()
  {
    this.home.deleteCart().subscribe(()=>{this.getListProduct();this.refresh();});

  }

  updateQuantity(ref:string,quan:number)
  {
    this.home.updateQuantity(ref,quan).subscribe(data => {console.log(data);this.refresh();})

  }

  deleteProductFromOrder(ref:string)
  {
  this.home.deleteProductFromOrder(ref).subscribe(()=>{this.getListProduct();this.refresh();});
  }

  changedGouvernorat()
  {
    alert(this.selectedValue);
  }




  city = [
    { name: 'Ariana', cities: ['Ariana', 'Raoued', 'Sidi Thabet'] },
    { name: 'Béja', cities: ['Béja', 'Medjez el-Bab', 'Téboursouk', 'Testour'] },
    { name: 'Ben Arous', cities: ['Ben Arous', 'Bou Mhel el-Bassatine', 'El Mourouj', 'Ezzahra', 'Hammam Chott', 'Mornag', 'Rades'] },
    { name: 'Bizerte', cities: ['Bizerte', 'Mateur', 'Menzel Bourguiba', 'Ras Jebel', 'Sejnane', 'Tinja', 'Utique', 'Zarzouna'] },
    { name: 'Gabès', cities: ['Gabès', 'El Hamma', 'Ghannouch', 'Matmata', 'Métouia', 'Nouvelle Matmata'] },
    { name: 'Gafsa', cities: ['Gafsa', 'El Ksar', 'Ksar Ghilane', 'Mdhilla', 'Métlaoui', 'Redeyef', 'Sened', 'Sidi Aïch'] },
    { name: 'Jendouba', cities: ['Jendouba', 'Aïn Draham', 'Balta-Bou Aouane', 'Bou Salem', 'Fernana', 'Ghardimaou', 'Oued Mliz', 'Tabarka'] },
    { name: 'Kairouan', cities: ['Kairouan', 'Alaa', 'Bou Hajla', 'Chebika', 'Haffouz', 'Oueslatia', 'Sbikha', 'Sidi Bou Ali'] },
    { name: 'Kasserine', cities: ['Kasserine', 'Sbeitla', 'Thala', 'Foussana', 'Haïdra', 'Hidra', 'Jedelienne', 'Feriana', 'El Ayoun'] },
    { name: 'Kébili', cities: ['Kébili', 'Douz', 'Faouar', 'Kébili Nord', 'Souk Lahad'] },
    { name: 'Le Kef', cities: ['Le Kef', 'Dahmani', 'Kalâat Khasba', 'Nebeur', 'Sakiet Sidi Youssef', 'Sers', 'Tajerouine', 'Kalaat Senan'] },
    { name: 'Mahdia', cities: ['Mahdia', 'Bou Merdes', 'Chebba', 'El Jem', 'Essouassi', 'Hebira', 'Ksour Essef', 'Melloulèche', 'Ouled Chamekh', 'Souassi'] },
    { name: 'Manouba', cities: ['Manouba', 'Borj El Amri', 'Douar Hicher', 'Mornaguia', 'Oued Ellil', 'Tébourba'] },
    { name: 'Sousse', cities: ['Sousse', 'Akouda', 'Bouficha', 'Mornaguia', 'Enfidha', 'Hammam Sousse', 'Hergla', 'Kalâa Kebira', 'Kalâa Seghira ', 'Kondar', 'Messaadine', 'Msaken', 'Sidi Bou Ali', 'Sidi El Heni', 'Sousse Jaouhara', 'Sousse Medina', 'Sousse Riadh', 'Sousse Sidi Abdelhamid'] },
    { name: 'Tunis', cities: ['Tunis', 'Carthage', 'La Goulette', 'Mornaguia', ' La Marsa', 'Sidi Bou Said'] },
    { name: 'Zaghouan', cities: ['Zaghouan', 'Bir Mcherga', ' Djebel Oust', 'El Fahs', 'Nadhour', 'Saouaf'] }
    ]
}
