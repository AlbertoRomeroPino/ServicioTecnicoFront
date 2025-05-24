import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  tituloMenu = 'Clientes'; // Por defecto
  seccionActual = 'clientes'; // Por defecto

  constructor(private menu: MenuController, private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (event.urlAfterRedirects.includes('clientes')) {
          this.tituloMenu = 'Clientes';
        } else if (event.urlAfterRedirects.includes('tecnicos')) {
          this.tituloMenu = 'Técnicos';
        } else if (event.urlAfterRedirects.includes('fichas')) {
          this.tituloMenu = 'Fichas';
        }
      });
  }
}