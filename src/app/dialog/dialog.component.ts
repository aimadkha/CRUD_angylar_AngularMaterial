import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ApiService } from './../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  freshnessList = ['Brand new', 'Like new', 'Good', 'Fair'];
  productForm!: FormGroup;
  actionBtn: string = 'Save';

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      comment: ['', Validators.required],
      price: ['', Validators.required],
      freshness: ['', Validators.required],
      category: ['', Validators.required],
      date: ['', Validators.required],
    });

    if (this.editData) {
      this.actionBtn = 'Update';
      this.productForm.controls['productName'].setValue(
        this.editData.productName
      );
      this.productForm.controls['comment'].setValue(this.editData.comment);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['date'].setValue(this.editData.date);
    }
  }

  addProduct() {
    if (!this.editData) {
      if (this.productForm.valid) {
        this.api.postProduct(this.productForm.value).subscribe({
          next: (res) => {
            alert('Product added successfully');
            this.productForm.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            alert('error occured');
          },
        });
      }
    } else {
      this.updateProduct();
    }
  }

  updateProduct() {
    if (this.productForm.valid) {
      this.api
        .updateProduct(this.editData.id, this.productForm.value)
        .subscribe({
          next: (res) => {
            alert('Product updated successfully');
            this.productForm.reset();
            this.productForm.reset;
            this.dialogRef.close('update');
          },
          error: () => {
            alert('error occured');
          },
        });
    }
  }
}
