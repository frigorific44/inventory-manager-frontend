import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {DividerModule} from 'primeng/divider';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextModule} from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import {TableModule} from 'primeng/table';
import {ToggleButtonModule} from 'primeng/togglebutton';
import { WarehouseListComponent } from './warehouse-list/warehouse-list.component';
import { SectionListComponent } from './section-list/section-list.component';
import { ItemListComponent } from './item-list/item-list.component';
import { InventoryComponent } from './inventory/inventory.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    WarehouseListComponent,
    SectionListComponent,
    ItemListComponent,
    InventoryComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TableModule,
    ButtonModule,
    InputTextareaModule,
    InputTextModule,
    InputNumberModule,
    FormsModule,
    CommonModule,
    CardModule,
    DropdownModule,
    BrowserAnimationsModule,
    PasswordModule,
    DividerModule,
    ToggleButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
