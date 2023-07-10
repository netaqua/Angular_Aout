import { Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmployesService} from '../../services/employes.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-newemploye',
  templateUrl: './newemploye.component.html',
  styleUrls: ['./newemploye.component.css']
})
export class NewemployeComponent implements OnInit{
  employeFormGroup?: FormGroup;
  submitted = false;
  idemploye:number|null=null;
  constructor(private fb: FormBuilder, private employeService: EmployesService, private router: Router) {
  }
  ngOnInit(): void {
    this.employeFormGroup = this.fb.group({
      matricule: ["", Validators.required],
      nom: ["", Validators.required],
      prenom: ["", Validators.required],
      tel: ["", Validators.required],
      mail: ["", Validators.required],
    });
  }
  /*onSaveEmploye() {
    this.submitted = true;
    if (this.employeFormGroup?.invalid) { return; }
    this.employeService.save(this.employeFormGroup?.value).subscribe(data =>
      alert('sauvegarde ok'),
    err => {
      alert(err.headers.get("error"));
    });
  }*/
  onSaveEmploye() {
    this.submitted = true;
    if (this.employeFormGroup?.invalid) { return; }
    this.employeService.save(this.employeFormGroup?.value).subscribe(data => {
      alert('Sauvegarde réussie');
      this.router.navigate(['/employes']);
    }, err => {
      alert(err.headers.get("error"));
    });
  }

}
