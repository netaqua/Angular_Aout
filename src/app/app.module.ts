import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { HomeComponent } from './components/home/home.component';
import { EmployesComponent } from './components/employes/employes.component';
import { ProjetsComponent } from './components/projets/projets.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NewemployeComponent } from './components/newemploye/newemploye.component';
import { EditemployeComponent } from './components/editemploye/editemploye.component';
import { NewprojetComponent } from './components/newprojet/newprojet.component';
import { EditprojetComponent } from './components/editprojet/editprojet.component';
import { AllprojetComponent } from './components/allprojet/allprojet.component';
import { ExamenComponent } from './components/examen/examen.component';

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    HomeComponent,
    EmployesComponent,
    ProjetsComponent,
    NewemployeComponent,
    EditemployeComponent,
    NewprojetComponent,
    EditprojetComponent,
    AllprojetComponent,
    ExamenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
