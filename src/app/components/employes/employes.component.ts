import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {EmployesService} from '../../services/employes.service';
import {Observable} from 'rxjs';
import {Employe} from '../../entities/employe.entities';
@Component({
  selector: 'app-employes',
  templateUrl: './employes.component.html',
  styleUrls: ['./employes.component.css']
})
export class EmployesComponent implements OnInit {
  employes?: Employe[]; //le ? signifie que la valeur undefinied est acceptée
  constructor(private employesService: EmployesService, private router: Router) { }
  ngOnInit(): void { }
  onSearch(value: any) {
    this.employesService.searchEmployes(value.nom).subscribe(
      data => {
        this.employes = data
      });
  }
  onNewEmploye() {
    this.router.navigateByUrl('newEmploye');
  }
  onDelete(e: Employe) {
    let v = confirm('êtes vous sûr de vouloir supprimer ? ');
    if (v) {
      this.employesService.deleteEmploye(e).subscribe(
        {
          next: data => {
            this.onSearch(e); //rafraîchissement de la page actuelle
//la solution ci-dessous permet de ne pas recharger la liste partir du backend
            /* const index = this.clients?.indexOf(c, 0); //élement à
            rechercher, position de départ de la recherche
            alert("index = "+index);
            if (!(index === undefined) && index > -1) {
            this.clients?.splice(index, 1);//position de l'élément à
            ôter,nombre d'éléments à ôter
            }*/
          },
          error: err => { alert(err.headers.get("error")); }
        }
      );
    }
  }
  onEdit(e: Employe) {
    this.router.navigateByUrl('editEmploye/'+e.idemploye);
  }
}
