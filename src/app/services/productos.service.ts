import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/info-producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  loading = true;
  productos: Producto[] = [];

  constructor( private http: HttpClient ) {
      this.loadProductos();
   }

   private loadProductos() {
      this.http.get('https://angular-html-3ed7c.firebaseio.com/productos_idx.json')
        .subscribe( (resp: Producto[]) => {
            console.log(resp);
            this.productos = resp;
            this.loading = false;
        });
    }
}