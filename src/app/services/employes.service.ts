import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Employe} from '../entities/employe.entities';
import {Projet} from "../entities/projet.entities";
@Injectable({providedIn:"root"})
export class EmployesService{
  private host = environment.host;
  constructor(private http: HttpClient) {
  }
  getEmploye(idemploye: number): Observable<Employe>{
    return this.http.get<Employe>(this.host + '/employes/' + idemploye);
  }

  getEmployeProj(idemploye: Employe): Observable<Employe>{
    return this.http.get<Employe>(this.host + '/employes/' + idemploye);
  }

  getAllEmployes(): Observable<Employe[]> {
    return this.http.get<Employe[]>(this.host +'/employes/all');
  }

  searchEmployeUnique(matricule: string,tel:string,mail:string):
    Observable<Employe[]>{
    return this.http.get<Employe[]>(this.host +
      '/employes/'+matricule+'/'+tel+'/'+mail);
  }
  searchEmployes(nom: string): Observable<Employe[]>{
    return this.http.get<Employe[]>(this.host + '/employes/nom=' + nom);
  }
  deleteEmploye(e: Employe): Observable<void>{
    return this.http.delete<void>(this.host + '/employes/' + e.idemploye);
  }
  save(e: Employe): Observable<Employe>{
    return this.http.post<Employe>(this.host + '/employes/', e);
  }
  updateEmploye(e: Employe): Observable<Employe>{
    return this.http.put<Employe>(this.host + '/employes/' + e.idemploye, e);
  }
}
