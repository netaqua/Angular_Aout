import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EmployesComponent} from "./components/employes/employes.component";
import {ProjetsComponent} from "./components/projets/projets.component";
import {HomeComponent} from "./components/home/home.component";
import {NewemployeComponent} from "./components/newemploye/newemploye.component";
import {EditemployeComponent} from "./components/editemploye/editemploye.component";
import {NewprojetComponent} from "./components/newprojet/newprojet.component";
import {EditprojetComponent} from "./components/editprojet/editprojet.component";
import {AllprojetComponent} from "./components/allprojet/allprojet.component";
import {ExamenComponent} from "./components/examen/examen.component";

const routes: Routes = [
  {path: 'employes', component: EmployesComponent},
  {path: 'projets', component: ProjetsComponent},
  {path: 'home', component:HomeComponent},
  {path: "newEmploye", component: NewemployeComponent},
  {path: "editEmploye/:idemploye", component:EditemployeComponent},
  {path: "newProjet", component: NewprojetComponent},
  {path: "editProjet/:idprojet", component: EditprojetComponent},
  {path: "allProjet", component: AllprojetComponent},
  {path: "examen", component: ExamenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
