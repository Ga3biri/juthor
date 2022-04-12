import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { NewProductComponent } from '../../new-product/new-product.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  products: Product[] = [];
  constructor(private dialog:MatDialog,private productService:ProductService) { }

  ngOnInit(): void {
    this.getAllProduct()
  }

  newProduct(){
    let dialogRef = this.dialog.open(NewProductComponent, {
      // data:order,
      height: '450px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
        this.getAllProduct()
    })
  }

  getAllProduct(){
    this.products = this.productService.getProducts()
  }
  search($event:any){
    console.log($event.target.value)
    this.products = this.productService.searchProduct($event.target.value)
  }
}
