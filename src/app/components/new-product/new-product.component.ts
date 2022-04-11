import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {

  form!:FormGroup;
  submitted=false;
  cost_quantity_error=false;
  cost_value:any;
  quantity_value:any;
  constructor(
    @Inject(MAT_DIALOG_DATA)public data: {data: string},
    private formbuilder:FormBuilder,
    private productService:ProductService,
    private dialogRef:MatDialogRef<NewProductComponent>
    ) { }

  ngOnInit(): void {
    this.form = this.formbuilder.group({
      name:['',Validators.required],
      price:['',Validators.required]
    });
  }

  get f(){return this.form.controls}
  files: File[] = [];

  onSelect(event:any) {
    this.files=[]
    this.files.push(...event.addedFiles);
  }
  onRemove(event:any) {
    this.files.splice(this.files.indexOf(event), 1);
  }


  cancel(){
    this.dialogRef.close();
  }

  submit(){
    // console.log(!this.cost_value)
    this.submitted = true;
    if(this.form.invalid || this.files.length == 0){return}
    else if( !this.cost_value && this.quantity_value  ){
      this.cost_quantity_error = true;
      return
    }
    else if( this.cost_value && !this.quantity_value ){
      this.cost_quantity_error = true;
      return
    }
    else{
      let new_product:Product = {
        image:this.files[0].name,
        name:this.form.value.name,
        price:this.form.value.price,
        quantity:this.quantity_value || 0,
        cost:this.cost_value || 0,
        action:''
      }
      this.productService.addProduct(new_product);
      this.dialogRef.close();
    }

    
  }
}
