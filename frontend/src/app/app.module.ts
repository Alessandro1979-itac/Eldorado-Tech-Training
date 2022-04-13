import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { DevicesComponent } from './devices/devices.component';
import { CategoriesComponent } from './categories/categories.component';
import { DevicesDialogComponent } from './devices/devices-dialog/devices-dialog.component';
import { CategoriesDialogComponent } from './categories/categories-dialog/categories-dialog.component';

import { AppRouters } from './app.routes';

import { ServicesCategory } from './services/services-category';
import { ServicesDevice } from './services/services-device';

import { EndPointService } from './services/endpoint';

import { WINDOW_PROVIDERS } from './window.provider';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    DevicesComponent,
    DevicesDialogComponent,
    CategoriesComponent,
    CategoriesDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    AppRouters,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    ServicesCategory,
    ServicesDevice,
    EndPointService,
    WINDOW_PROVIDERS,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
