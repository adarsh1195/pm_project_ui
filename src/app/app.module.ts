
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { EmployeeComponent } from './employee/employee.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialComponentsModule } from './material-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as $ from 'jquery';
import { ClipboardModule } from 'ngx-clipboard';




@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialComponentsModule,
    BrowserAnimationsModule,
    FormsModule,
    ClipboardModule,
    RouterModule.forRoot([
      {path: '',  component: AppComponent},
      {path: 'employees', component: EmployeeComponent},
    ]),
    
  ],
  providers: [

  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
