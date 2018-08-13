import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from './login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {ModalModule} from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
