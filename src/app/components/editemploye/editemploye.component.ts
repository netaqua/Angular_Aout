import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmployesService} from '../../services/employes.service';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-editemploye',
  templateUrl: './editemploye.component.html',
  styleUrls: ['./editemploye.component.css']
})
export class EditemployeComponent implements OnInit {
  employeFormGroup?: FormGroup;
  submitted = false;
  idEmploye: number;
  constructor(private employeService: EmployesService,private fb:
    FormBuilder,activatedRoute : ActivatedRoute, private router: Router) {
    this.idEmploye=activatedRoute.snapshot.params.idemploye;
  }
  ngOnInit(): void {
    this.employeService.getEmploye(this.idEmploye).subscribe(
      employe =>{this.employeFormGroup = this.fb.group({
        idemploye: [employe.idemploye, Validators.required],
        matricule: [employe.matricule, Validators.required],
        nom: [employe.nom, Validators.required],
        prenom: [employe.prenom, Validators.required],
        tel: [employe.tel, Validators.required],
        mail: [employe.mail, Validators.required]
      })
      });
  }
  onUpdateEmploye(): void {
    this.submitted = true;
    if (this.employeFormGroup?.invalid) { return; }
    this.employeService.updateEmploye(this.employeFormGroup?.value).subscribe(data => {
      alert('Changement enregistré'),
        this.router.navigate(['/employes']);
      },
      err => {
        alert(err.headers.get("error"));
      });
  }
}
