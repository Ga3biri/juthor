import { Injectable } from '@angular/core';
import {Product} from '../models/product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  current_Product = [
    {
      image:'',
      price: 10,
      name: 'first',
      quantity: 20,
      cost: 20,
      action:''
    },{
      image:'',
      price: 22,
      name: 'Second',
      quantity: 50,
      cost: 22,
      action:''
    },
    {
      image:'',
      price: 100,
      name: 'Third',
      quantity: 30,
      cost: 44,
      action:''
        }
  ];

  constructor() { }

  getProducts(): Product[] {
    return  this.current_Product
  }
  addProduct(product: Product) {
    this.current_Product.push(product)
  }
  deleteProduct(product: Product) {
    this.current_Product.splice(this.current_Product.indexOf(product), 1)
  }
  updateProduct(product: Product) {
    this.current_Product[this.current_Product.indexOf(product)] = product
  }
  searchProduct(name: string) {
    return this.current_Product.filter(product => product.name.includes(name))
  }
}
