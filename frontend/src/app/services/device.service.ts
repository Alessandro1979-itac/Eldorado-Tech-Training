import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DeviceModel } from '../models/device';

import { environment } from './../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  devices$: BehaviorSubject<DeviceModel[]>;

  constructor(private _http: HttpClient) {
    this.devices$ = new BehaviorSubject<DeviceModel[]>([]);
  }

  private getHeaders(): any {
    return {
      'Content-Type': 'application/json',
    };
  }

  getDevices(): Observable<DeviceModel[]> {
    return this._http
      .get<any>(`${base_url}/device`, {
        observe: 'response',
        headers: this.getHeaders(),
      })
      .pipe(
        map((res) => {
          return res.body;
        })
      );
  }

  saveDevice(item: DeviceModel): Observable<any> {
    return this._http
      .post<any>(`${base_url}/device/save`, item, {
        observe: 'response',
        headers: this.getHeaders(),
      })
      .pipe(
        map((res) => {
          return res.body;
        })
      );
  }

  deleteDevice(deviceId: number): Observable<any> {
    return this._http
      .delete<any>(`${base_url}/device/delete/${deviceId}`, {
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
