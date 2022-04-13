import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CategoryModel } from '../../models/category';

@Component({
  selector: 'categories-dialog',
  templateUrl: './categories-dialog.component.html',
  styleUrls: ['./categories-dialog.component.css'],
})
export class CategoriesDialogComponent implements OnInit {
  params = {
    id: 0,
    name: '',
  };
  public event: EventEmitter<any> = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<CategoriesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CategoryModel
  ) {
    this.params.id = data.id;
    this.params.name = data.name;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.event.emit(this.params);
    this.dialogRef.close();
  }

  ngOnInit(): void {}
}
