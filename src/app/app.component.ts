import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

import { ApiService } from './services/api.service';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular13Crud-demo-angular-material';

  constructor(public dialog: MatDialog, private api: ApiService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '50%',
    });
  }

  getAllProducts() {
    this.api.getProduct().subscribe({
      next: (res) => {
        console.log(res);
      },
      error: () => {
        alert('error occured');
      },
    });
  }
}
