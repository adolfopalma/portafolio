import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: any = {};
  cargada = false;

  team: any[] = [];

  constructor( private http: HttpClient ) { 
    this.loadInfo();
    this.loadTeam();
  }

  private loadInfo() {
    this.http.get('assets/data/data-pagina.json')
      .subscribe( (resp: any[]) => {
        this.cargada = true;
        this.info = resp;
      } );
  }

  private loadTeam() {
      this.http.get('https://angular-html-3ed7c.firebaseio.com/equipo.json')
        .subscribe( (resp: any[]) => {
          this.team = resp;
          console.log(resp);
        } );
  }
}
