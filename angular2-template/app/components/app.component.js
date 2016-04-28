"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("angular2/core");
var router_1 = require('angular2/router');
var home_1 = require('./home');
var info_1 = require('./info');
var about_1 = require('./about');
var App = (function () {
    function App() {
        this.message = 'Click me';
    }
    App.prototype.onClick = function () {
        console.log("clicked");
    };
    App = __decorate([
        core_1.Component({
            selector: 'app',
            directives: [router_1.ROUTER_DIRECTIVES],
            template: "\n        <div>Angular 2 component app</div>\n        <button (click)=\"onClick()\">{{message}}</button>\n        <about></about>\n\n        <router-outlet></router-outlet>\n\n        <h1>Component Router</h1>\n        <nav>\n            <a [routerLink]=\"['Home']\">Home</a>\n            <a [routerLink]=\"['Info']\">Info</a>\n            <a [routerLink]=\"['About']\">About</a>\n        </nav>\n    "
        }),
        router_1.RouteConfig([
            { path: '/home',
                name: 'Home',
                component: home_1.Home,
                useAsDefault: true },
            { path: '/info',
                name: 'Info',
                component: info_1.Info },
            { path: '/about',
                name: 'About',
                component: about_1.About }
        ]), 
        __metadata('design:paramtypes', [])
    ], App);
    return App;
}());
exports.App = App;
