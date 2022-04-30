import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CategoryModel } from '../../models/category';
import { DeviceModel } from '../../models/device';

import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'devices-dialog',
  templateUrl: './devices-dialog.component.html',
  styleUrls: ['./devices-dialog.component.css'],
})
export class DevicesDialogComponent implements OnInit {
  params = {
    id: 0,
    categoryId: 0,
    color: '',
    partNumber: 0,
  };
  public event: EventEmitter<any> = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<DevicesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DeviceModel,
    public _services: CategoryService
  ) {
    this.params.id = data.id;
    this.params.categoryId = data.categoryId;
    this.params.color = data.color;
    this.params.partNumber = data.partNumber;
  }

  public categories: CategoryModel[] = [];

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.event.emit(this.params);
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this._services.getCategories().subscribe((res) => {
      this.categories = res;
    });
  }
}
