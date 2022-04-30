import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CategoryModel } from '../models/category';

import { environment } from './../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  categories$: BehaviorSubject<CategoryModel[]>;

  constructor(private _http: HttpClient) {
    this.categories$ = new BehaviorSubject<CategoryModel[]>([]);
  }

  private getHeaders(): any {
    return {
      'Content-Type': 'application/json',
    };
  }

  getCategories(): Observable<CategoryModel[]> {
    return this._http
      .get<any>(`${base_url}/category`, {
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
    return this._http
      .post<any>(`${base_url}/category/save`, item, {
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
    return this._http
      .delete<any>(`${base_url}/category/delete/${categoryId}`, {
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
