import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DeviceModel } from '../models/device';
import { EndPointService } from './endpoint';

@Injectable({
  providedIn: 'root',
})
export class ServicesDevice {
  devices$: BehaviorSubject<DeviceModel[]>;

  constructor(private _http: HttpClient, private _endPoint: EndPointService) {
    this.devices$ = new BehaviorSubject<DeviceModel[]>([]);
  }

  private getHeaders(): any {
    return {
      'Content-Type': 'application/json',
    };
  }

  getDevices(): Observable<DeviceModel[]> {
    let url = this._endPoint.getRestService('device');
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

  saveDevice(item: DeviceModel): Observable<any> {
    let url = this._endPoint.getRestService('device/save');
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

  deleteDevice(deviceId: number): Observable<any> {
    let url = this._endPoint.getRestService('device/delete/' + deviceId);
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
