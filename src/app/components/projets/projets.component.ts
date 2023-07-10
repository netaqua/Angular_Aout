import { Component, OnInit } from '@angular/core';
import {Projet} from '../../entities/projet.entities';
import {Router} from '@angular/router';
import {ProjetService} from "../../services/projets.service";
import {Employe} from "../../entities/employe.entities";
@Component({
  selector: 'app-projets',
  templateUrl: './projets.component.html',
  styleUrls: ['./projets.component.css']
})
export class ProjetsComponent  implements OnInit{
  projet: Projet|null=null;

  projetsFiltres: Projet[] = [];

  projets: Projet[] = [];

  idprojet :number=0;
  constructor(private projetService: ProjetService, private router: Router) {
  }
  ngOnInit(): void {}
  onSearch(value : any) {
    this.projet=null;
    this.projetService.getProjet(value.idprojet).subscribe(
      data => {this.projet=data},
        err=>{alert("projet introuvable")});
  }
  onNewProjet() {
    this.router.navigateByUrl('newProjet');
  }
  onProjetALL() {
    this.router.navigateByUrl('allProjet');
  }
  onDelete(p: Projet) {
    let v = confirm('êtes vous sûr de vouloir supprimer ? ');
    if (v) {
      this.projetService.deleteProjet(p).subscribe(
        {
          next: data => {
            this.onSearch(p.idprojet);
          },
          error: err => { alert(err.headers.get("error")); }
        }
      );
    }
  }
  onEdit(p: Projet) {
    this.router.navigateByUrl('editProjet/'+p.idprojet);
  }

  /*
  getProjets() {
    this.projetService.getProjets().subscribe(
      projets => {
        this.projets = projets;
      },
      error => {
        console.log('Erreur lors de la récupération des projets : ', error);
      }
    );
  }*/

  onSearchCout(value : any) {
    const cout = parseFloat(value.cout); // Convertir la valeur saisie en nombre

    if (!isNaN(cout)) {
      /*this.projetService.searchProjetCout(cout).subscribe(
        data => {
          this.projets = data;
          if (this.projets.length === 0) {
            alert("Aucun projet trouvé pour le cout spécifié.");
          }
        },
        err => {
          alert("Une erreur s'est produite lors de la recherche des projets.");
        }
      );*/
      this.projetService.getProjets().subscribe(
        projets => {
          this.projets = projets;
          this.projets = this.projets.filter(projet => projet.cout >= cout);
        },
        error => {
          console.log('Erreur lors de la récupération des projets : ', error);
        }
      );

    } else {
      alert("Veuillez saisir un nombre valide pour le cout.");
    }
  }

}
