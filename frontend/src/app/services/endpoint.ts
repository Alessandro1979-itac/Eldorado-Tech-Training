import { Inject, Injectable } from '@angular/core';

import { WINDOW } from '../window.provider';

@Injectable()
export class EndPointService {
  constructor(@Inject(WINDOW) private window: Window) {}

  public getRestService(service: string): string {
    let hostName = this.window.location.hostname.toLowerCase();

    return `http://${hostName}:8080/api/${service}`;
  }
}
