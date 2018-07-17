import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { ShoppingListService } from './../../services/shopping-list/shopping-list.service';
import { Item } from './../../models/item/item.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  shoppingList$: Observable<Item[]>;
  //shoppingList: Array<Item>= [];
  constructor(public navCtrl: NavController, private shopping: ShoppingListService) {
    this.shoppingList$ = this.shopping
      .getShoppingList()
      .snapshotChanges()
      .map(
        changes => {
          return changes.map(c => ({
            key: c.payload.key, ...c.payload.val()
          }))
        }
      );
/*
      this.shoppingList$ = this.shopping
        .getShoppingList()
        .valueChanges()
        .subscribe((datas) => {
          console.log('sadf');
            console.log("datas",datas);
        },(err)=>{
          console.log('asdf');
          console.log("problems: ",err);
        }
      );
*/
      console.log(this.shoppingList$);
      /*let item = {name:"test"};
      this.shoppingList.push(item);
      */
  }

  ionViewDidLoad() {
    console.log(this.shoppingList$);
  }
}
