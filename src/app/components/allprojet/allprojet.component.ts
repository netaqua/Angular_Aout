import { Component, OnInit} from '@angular/core';
import {Projet} from "../../entities/projet.entities";
import {ProjetService} from "../../services/projets.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-allprojet',
  templateUrl: './allprojet.component.html',
  styleUrls: ['./allprojet.component.css']
})
export class AllprojetComponent implements OnInit{

  projetOne: Projet|null=null;
  projets?: Projet[];

  idprojet :number=0;
  constructor(private projetService: ProjetService, private router: Router) {
  }
  ngOnInit(): void {
    this.getProjets();
  }
  onSearch() {
    this.projetService.searchProjet().subscribe(
      data => {this.projets = data},
      err=>{alert("projet introuvable")});
  }

  onSearchOne(value : any) {
    this.projetOne=null;
    this.projetService.getProjet(value.idprojet).subscribe(
      data => {this.projetOne=data},
      err=>{alert("projet introuvable")});
  }

  getProjets() {
    this.projetService.getProjets().subscribe(
      projets => {
        this.projets = projets;
      },
      error => {
        console.log('Erreur lors de la récupération des projets : ', error);
      }
    );
  }


  onEdit(p: Projet) {
    this.router.navigateByUrl('editProjet/'+p.idprojet);
  }

  onDelete(p: Projet) {
    let v = confirm('êtes vous sûr de vouloir supprimer ? ');
    if (v) {
      this.projetService.deleteProjet(p).subscribe(
        {
          next: data => {
            this.onSearchOne(p.idprojet);
          },
          error: err => { alert(err.headers.get("error")); }
        }
      );
    }
  }
}
