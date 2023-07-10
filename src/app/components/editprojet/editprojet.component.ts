import { Component,Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Projet} from '../../entities/projet.entities';
import {ProjetService} from "../../services/projets.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Employe} from "../../entities/employe.entities";
import {EmployesService} from "../../services/employes.service";
@Component({
  selector: 'app-editprojet',
  templateUrl: './editprojet.component.html',
  styleUrls: ['./editprojet.component.css']
})
export class EditprojetComponent implements OnInit{

  projetFormGroup?: FormGroup;
  employes: Employe[] = [];
  submitted=false;
  @Input() projet?:Projet;
  deleted=false;
  idProjet : number;
  constructor(private projetService: ProjetService, private router: Router, private employeService: EmployesService, private fb:
    FormBuilder,activatedRoute : ActivatedRoute) {
    this.idProjet=activatedRoute.snapshot.params.idprojet
  }
  ngOnInit(): void {
    this.projetService.getProjet(this.idProjet).subscribe(
      projet =>{this.projetFormGroup = this.fb.group({
        idprojet: [projet.idprojet, Validators.required],
        nomproj: [projet.nomproj, Validators.required],
        datedebut: [projet.datedebut, Validators.required],
        datefin: [projet.datefin, Validators.required],
        cout: [projet.cout, Validators.required],
        idresponsable: [projet.idresponsable, Validators.required]
      })
      });
    this.loadEmployes();
  }

  loadEmployes(): void {
    this.employeService.getAllEmployes().subscribe(
      (employes: Employe[]) => {
        this.employes = employes;
      },
      (error) => {
        console.log('Une erreur s\'est produite lors de la récupération des employés :', error);
      }
    );
  }
  onUpdateProjet(): void {
    this.submitted = true;

    if (this.projetFormGroup?.invalid) {
      return;
    }

    const npj = this.projetFormGroup?.value;
    const idResponsable = npj.idresponsable;

    this.employeService.getEmploye(idResponsable).subscribe(
      (employe) => {
        npj.idresponsable = employe; // Assigner l'objet employé correspondant à l'ID du responsable

        this.projetService.updateProjet(npj).subscribe(
          (data) => {
            alert('Changement enregistré');
            this.router.navigate(['/projets']);
          },
          (err) => {
            alert(err.headers.get('error'));
          }
        );
      },
      (error) => {
        console.log('Une erreur s\'est produite lors de la récupération de l\'employé :', error);
      }
    );
  }
}
