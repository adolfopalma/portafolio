import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/info-producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  loading = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor( private http: HttpClient ) {
      this.loadProductos();
   }

   private loadProductos() {
      return new Promise( ( resolve, reject ) => {
        this.http.get('https://angular-html-3ed7c.firebaseio.com/productos_idx.json')
        .subscribe( (resp: Producto[]) => {
            this.productos = resp;
            this.loading = false;
            resolve();
        });
      }); 
    }

    getProducto( id: string) {
      return this.http.get(`https://angular-html-3ed7c.firebaseio.com/productos/${ id }.json`);
    }

    buscarProducto( termino: string ) {
      if ( this.productos.length === 0 ) {
          this.loadProductos().then(  () => {
            this.filtrarProductos( termino );
          });
      }else {
          this.filtrarProductos( termino );
      }

      this.productosFiltrado = this.productos.filter( producto => {
        return true;
      }) 
    } 

    private filtrarProductos( termino: string) {
      this.productosFiltrado = [];

      termino = termino.toLocaleLowerCase();

      this.productos.forEach( prod => {

        const tituloLower = prod.titulo.toLocaleLowerCase();

        if ( prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf( termino ) >= 0 ) {
          this.productosFiltrado.push( prod );
        }
      });
    }
}