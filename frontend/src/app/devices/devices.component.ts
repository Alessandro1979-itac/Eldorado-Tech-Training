import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';

import { DevicesDialogComponent } from './devices-dialog/devices-dialog.component';

import { DeviceService } from '../services/device.service';

import { DeviceModel } from '../models/device';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css'],
})
export class DevicesComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns = ['id', 'category', 'color', 'partNumber', 'actions'];

  public dataSource: MatTableDataSource<DeviceModel>;
  private serviceSubscribe: Subscription;

  constructor(public _dialog: MatDialog, private _services: DeviceService) {
    this.dataSource = new MatTableDataSource<DeviceModel>();
    this.serviceSubscribe = this._services.devices$.subscribe((res) => {
      this.dataSource.data = res;
    });
  }

  ngOnInit() {
    this.get();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.serviceSubscribe.unsubscribe();
  }

  get() {
    this._services.getDevices().subscribe(
      (res) => {
        this.dataSource.data = res;
        if (this.dataSource.data.length === 0)
          Swal.fire('Warning', 'Device Not Found!', 'warning');
      },
      (err) => {
        Swal.fire('Ops!', err.message, 'error');
      }
    );
  }

  openDialog(item?: DeviceModel): void {
    let dialogRef = this._dialog.open(DevicesDialogComponent, {
      width: '600px',
      data: {
        id: item == null ? 0 : item.id,
        categoryId: item == null ? 0 : item.categoryId,
        color: item == null ? '' : item.color,
        partNumber: item == null ? 0 : item.partNumber,
      },
    });
    dialogRef.componentInstance.event.subscribe((result) => {
      Swal.fire({
        title: 'Attention',
        text: 'Do you confirm?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: 'green',
        cancelButtonColor: 'red',
        confirmButtonText: 'Yes, save!',
        cancelButtonText: 'No, do not save!',
      }).then((res) => {
        if (res.isConfirmed)
          this._services.saveDevice(result).subscribe(
            (res) => {
              Swal.fire('Success!', 'Device was saved.', 'success');
              this.get();
            },
            (err) => {
              Swal.fire('Ops!', err.message, 'error');
            }
          );
      });
    });
  }

  delete(item: DeviceModel) {
    Swal.fire({
      title: 'Warning',
      text: 'Do you confirm?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: 'red',
      confirmButtonText: 'Yes, delete!',
      cancelButtonText: 'No, do not delete!',
    }).then((res) => {
      if (res.isConfirmed)
        this._services.deleteDevice(item.id).subscribe(
          (res) => {
            Swal.fire('Success!', 'Device was deleted.', 'success');
            this.get();
          },
          (err) => {
            Swal.fire('Ops!', err.message, 'error');
          }
        );
    });
  }
}
