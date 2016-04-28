/*
  ng2-component-root
*/
import { Component } from 'angular2/core';
import { HTTP_PROVIDERS } from 'angular2/http';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import 'rxjs/Rx';

@Component({
    selector: 'selector',
    templateUrl: 'path/name.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [
      HTTP_PROVIDERS,
      ROUTER_PROVIDERS
    ]
})
@RouteConfig([

])
export class AppComponent {}

/*
  ng2-bootstrap
*/
import { bootstrap } from 'angular2/platform/browser';
import { AppComponent } from './name.component';
bootstrap(AppComponent, [])
    .then(success => console.log(`Bootstrap success`))
    .catch(error => console.log(error));

/*
  ng2-component
*/
import { Component, OnInit } from 'angular2/core';

@Component({
    selector: 'selector',
    templateUrl: 'path/name.component.html'
})
export class ComponentNameComponent implements OnInit {
    constructor() { }

    ngOnInit() { }

}

/*
  ng2-routes
*/
@RouteConfig([
    { path: '/path', as: 'RouteName', component: Component }
])

/*
  ng2-route-path
*/
{ path: '/path', as: 'RouteName', component: Component }

/*
  ng2-service
*/
import { Injectable } from 'angular2/core';

@Injectable()
export class ServiceNameService {

    constructor() { }

}

/*
  ng2-subscribe
*/
this.service.function
    .subscribe(arg => this.property = arg);

/*
  ng2-pipe
*/
import { Pipe, PipeTransform } from 'angular2/core';

@Pipe({
    name: 'name'
})

export class PipeNamePipe implements PipeTransform {
    transform(value: valuetype, args: argstype) : any {

    }
}
