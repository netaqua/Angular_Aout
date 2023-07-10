import { Component, OnInit } from '@angular/core';
import { ProjetService } from '../../services/projets.service';
import { EmployesService } from '../../services/employes.service';
import { Router } from '@angular/router';
import { Projet } from '../../entities/projet.entities';
import { Employe } from '../../entities/employe.entities';

@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.css']
})
export class ExamenComponent implements OnInit {
  employes?: Employe[] = [];
  employe?: Employe;
  projets?: Projet[] = [];
  projet?: Projet;

  constructor(private projetService: ProjetService, private employeService: EmployesService) {}

  ngOnInit(): void {}

  onSearch(value: any) {
    this.projetService.searchProjets(value.nomproj).subscribe(
      data => {
        this.projets = data;
        this.employes = this.getUniqueEmployees(data);
      });
  }

  getUniqueEmployees(projets: Projet[]): Employe[] {
    const listEmployees: Employe[] = [];
    const employeeMap = new Map<number, Employe>();

    projets.forEach(projet => {

      this.employeService.getEmployeProj(projet.idresponsable).subscribe(
        data => {
          const employe =data;
          if (!employeeMap.has(employe.idemploye)) {
            employeeMap.set(employe.idemploye, employe);
            listEmployees.push(employe);
          }
        }
      )

    });

    return listEmployees;
  }
}

