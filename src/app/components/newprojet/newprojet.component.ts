import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Projet } from '../../entities/projet.entities';
import { formatDate } from '@angular/common';
import { ProjetService } from "../../services/projets.service";
import { EmployesService } from "../../services/employes.service";
import { Router } from '@angular/router';
import {Employe} from "../../entities/employe.entities";

@Component({
  selector: 'app-newprojet',
  templateUrl: './newprojet.component.html',
  styleUrls: ['./newprojet.component.css']
})
export class NewprojetComponent implements OnInit {
  @Input() empact?: FormGroup;
  @Output() newProjet = new EventEmitter<Projet>();
  projetFormGroup?: FormGroup;

  employes: Employe[] = [];
  submitted = false;
  pj?: Projet;

  constructor(
    private fb: FormBuilder,
    private projetService: ProjetService,
    private employeService: EmployesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.projetFormGroup = this.fb.group({
      nomproj: ['', Validators.required],
      datedebut: [formatDate(new Date(), 'yyyy-MM-dd', 'en'), Validators.required],
      datefin: [formatDate(new Date(), 'yyyy-MM-dd', 'en'), Validators.required],
      cout: ['0', Validators.min(1)],
      idresponsable: ['', Validators.required]
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
  onSaveProjet(): void {
    this.submitted = true;

    if (this.projetFormGroup?.invalid) {
      return;
    }

    const npj = this.projetFormGroup?.value;
    const idResponsable = npj.idresponsable;

    this.employeService.getEmploye(idResponsable).subscribe(
      (employe) => {
        npj.idresponsable = employe;

        this.projetService.save(npj).subscribe(
          (data) => {
            alert('Sauvegarde réussie');
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
