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

import { CategoriesDialogComponent } from './categories-dialog/categories-dialog.component';

import { ServicesCategory } from '../services/services-category';

import { CategoryModel } from '../models/category';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public dataSource: MatTableDataSource<CategoryModel>;
  private serviceSubscribe: Subscription;

  constructor(public _dialog: MatDialog, private _services: ServicesCategory) {
    this.dataSource = new MatTableDataSource<CategoryModel>();
    this.serviceSubscribe = this._services.categories$.subscribe((res) => {
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

  displayedColumns = ['id', 'name', 'actions'];

  get() {
    this._services.getCategories().subscribe(
      (res) => {
        this.dataSource.data = res;
        if (this.dataSource.data.length === 0)
          Swal.fire('Warning', 'Category Not Found!', 'warning');
      },
      (err) => {
        Swal.fire('Ops!', err.message, 'error');
      }
    );
  }

  openDialog(item?: CategoryModel): void {
    let dialogRef = this._dialog.open(CategoriesDialogComponent, {
      width: '600px',
      data: {
        id: item == null ? 0 : item.id,
        name: item == null ? '' : item.name,
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
          this._services.saveCategory(result).subscribe(
            (res) => {
              Swal.fire('Success!', 'Category was saved.', 'success');
              this.get();
            },
            (err) => {
              Swal.fire('Ops!', err.message, 'error');
            }
          );
      });
    });
  }

  delete(item: CategoryModel) {
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
        this._services.deleteCategory(item.id).subscribe(
          (res) => {
            Swal.fire('Success!', 'Category was deleted.', 'success');
            this.get();
          },
          (err) => {
            Swal.fire('Ops!', err.message, 'error');
          }
        );
    });
  }
}
