import { Component}      from "angular2/core"
import {
    RouteConfig,
    ROUTER_DIRECTIVES}  from 'angular2/router'

//Internal import
import {Home}           from './home';
import {Info}        from './info';
import {About}          from './about';

@Component({
    selector: 'app',
    directives: [ROUTER_DIRECTIVES],
    template: `
        <div>Angular 2 component app</div>
        <button (click)="onClick()">{{message}}</button>
        <about></about>

        <router-outlet></router-outlet>

        <h1>Component Router</h1>
        <nav>
            <a [routerLink]="['Home']">Home</a>
            <a [routerLink]="['Info']">Info</a>
            <a [routerLink]="['About']">About</a>
        </nav>
    `
})

@RouteConfig([
    { path: '/home',
      name: 'Home',
      component: Home,
      useAsDefault: true },

    { path: '/info',
      name: 'Info',
      component: Info },

    { path: '/about',
      name: 'About',
      component: About }

])

export class App {
    message: String;
    constructor() {
            this.message = 'Click me';
    }
    onClick() {
        console.log("clicked");
    }
}
