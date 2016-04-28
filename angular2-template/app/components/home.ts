import {Component} from 'angular2/core';

@Component({
    selector: 'home',
    template: `
        <h2>Home</h2>
    `
})
export class Home {
    constructor() {
        console.log('home log');
    }
}
