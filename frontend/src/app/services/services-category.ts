import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoryModel } from '../models/category';
import { EndPointService } from './endpoint';

@Injectable({
  providedIn: 'root',
})
export class ServicesCategory {
  categories$: BehaviorSubject<CategoryModel[]>;

  constructor(private _http: HttpClient, private _endPoint: EndPointService) {
    this.categories$ = new BehaviorSubject<CategoryModel[]>([]);
  }

  private getHeaders(): any {
    return {
      'Content-Type': 'application/json',
    };
  }

  getCategories(): Observable<CategoryModel[]> {
    let url = this._endPoint.getRestService('category/get');
    return this._http
      .get<any>(url, {
        observe: 'response',
        headers: this.getHeaders(),
      })
      .pipe(
        map((res) => {
          return res.body;
        })
      );
  }

  saveCategory(item: CategoryModel): Observable<any> {
    let url = this._endPoint.getRestService('category/save');
    return this._http
      .post<any>(url, item, {
        observe: 'response',
        headers: this.getHeaders(),
      })
      .pipe(
        map((res) => {
          return res.body;
        })
      );
  }

  deleteCategory(categoryId: number): Observable<any> {
    let url = this._endPoint.getRestService('category/delete/' + categoryId);
    return this._http
      .delete<any>(url, {
        observe: 'response',
        headers: this.getHeaders(),
      })
      .pipe(
        map((res) => {
          return res.body;
        })
      );
  }
}
