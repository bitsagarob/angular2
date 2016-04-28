"use strict";
require('zone.js/dist/zone');
require('reflect-metadata');
var app_component_1 = require('./components/app.component');
var browser_1 = require('angular2/platform/browser');
var router_1 = require('angular2/router');
browser_1.bootstrap(app_component_1.App, [
    router_1.ROUTER_PROVIDERS
]);
