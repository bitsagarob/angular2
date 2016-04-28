/// <reference path="../node_modules/angular2/typings/browser.d.ts" />

import 'zone.js/dist/zone';
import 'reflect-metadata';

import { App }                 from './components/app.component';
import { bootstrap }           from 'angular2/platform/browser';
import { ROUTER_PROVIDERS }    from 'angular2/router'

/*
 * App Component
 * our top level component that holds all of our components
 */

/*
 * Bootstrap our Angular app with a top level component `App` and inject
 * our Services and Providers into Angular's dependency injection
 */

bootstrap(App, [
    ROUTER_PROVIDERS
]);
