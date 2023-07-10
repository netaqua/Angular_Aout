import {Employe} from './employe.entities'
export interface Projet {
  idprojet: number;
  nomproj: string;
  datedebut: string;
  datefin: string;

  cout: number;
  idresponsable: Employe;
}
