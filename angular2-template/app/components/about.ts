import {Component} from 'angular2/core';

@Component({
    selector: 'about',
    template: `
        <h2>About</h2>
    `
})
export class About {
    constructor() {
        console.log('about log');
    }
}
