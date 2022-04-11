import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-quantity',
  templateUrl: './add-quantity.component.html',
  styleUrls: ['./add-quantity.component.scss']
})
export class AddQuantityComponent implements OnInit {

  form!:FormGroup;
  submitted=false;
  cost_quantity_error=false;
  constructor(
    @Inject(MAT_DIALOG_DATA)public data: Product,
    private formbuilder:FormBuilder,
    private productService:ProductService,
    private dialogRef:MatDialogRef<AddQuantityComponent>
    ) { }

  ngOnInit(): void {
    this.form = this.formbuilder.group({
      cost:['',Validators.required],
      quantity:['',Validators.required],
    });
  }

  get f(){return this.form.controls}

  cancel(){
    this.dialogRef.close();
  }
  submit(){
    this.submitted = true;
    if(this.form.invalid){return}
    
    this.data.cost = (( this.data.cost * this.data.quantity )+ this.form.value.cost )/(this.data.quantity+this.form.value.quantity);
    this.data.quantity = this.form.value.quantity + this.data.quantity;

    this.productService.updateProduct(this.data);
    this.dialogRef.close();
  }
}
