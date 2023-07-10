import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Projet } from '../entities/projet.entities';
import { Employe } from '../entities/employe.entities';
import { Router } from '@angular/router';

@Injectable({ providedIn: "root" })
export class ProjetService {
  private host = environment.host;

  constructor(private http: HttpClient, private router: Router) { }

  getProjet(idprojet: number): Observable<Projet> {
    return this.http.get<Projet>(`${this.host}/projets/${idprojet}`);
  }

  searchProjet(): Observable<Projet[]> {
    return this.http.get<Projet[]>(`${this.host}/projets/all`);
  }

  deleteProjet(p: Projet): Observable<void> {
    return this.http.delete<void>(`${this.host}/projets/${p.idprojet}`);
  }

  save(p: Projet): Observable<Projet> {
    return this.http.post<Projet>(`${this.host}/projets/`, p);
  }

  updateProjet(p: Projet): Observable<Projet> {
    return this.http.put<Projet>(`${this.host}/projets/${p.idprojet}`, p);
  }

  getProjetResponsable(idemploye: number): Observable<Projet[]> {
    return this.http.get<Projet[]>(`${this.host}/projets/idemploye=${idemploye}`);
  }

  getProjets(): Observable<Projet[]> {
    return this.http.get<Projet[]>(`${this.host}/projets/all`);
  }

  searchProjetCout(cout: number): Observable<Projet[]>{
    return this.http.get<Projet[]>(this.host + '/projets/cout=' + cout);
  }

  searchProjets(nomproj: string): Observable<Projet[]>{
    return this.http.get<Projet[]>(this.host + '/projets/nomproj='+ nomproj);
  }

}
