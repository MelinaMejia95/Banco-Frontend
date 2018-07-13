import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyDatePickerModule } from 'mydatepicker';


import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { ConsultComponent } from './consult/consult.component';

import { ConnectionService } from './service/connection.service';
import { HttpModule } from '@angular/http';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    ConsultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MyDatePickerModule
  ],
  providers: [ ConnectionService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
