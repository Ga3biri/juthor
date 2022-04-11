import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Product} from '../../models/product';
import { MatDialog } from '@angular/material/dialog';
import { AddQuantityComponent } from '../add-quantity/add-quantity.component';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})

export class ProductListComponent implements OnInit {
  columnsToDisplay = ['image','name', 'quantity', 'cost', 'price','action'];
  expandedElement: any;
  @Input() products:any;

  public canvasWidth = 300
  public needleValue = 65
  public centralLabel = ''
  public name = 'Gauge chart'
  public options = {
      hasNeedle: true,
      needleColor: 'gray',
      needleUpdateSpeed: 1000,
      arcColors: ['red','yellow','green'],
      arcDelimiters: [30,70],
      needleStartValue: 50,
      background: 'blue',
  }

  constructor(private dialog:MatDialog,private productService:ProductService){ }

  ngOnInit() {
  }

  addQuantity(product: Product) {
    let dialogRef = this.dialog.open(AddQuantityComponent, {
      data:product,
      height: '300px',
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(result => {
        this.getAllProduct()
    })
  }
  getAllProduct(){
    this.products = this.productService.getProducts()
  }
}

