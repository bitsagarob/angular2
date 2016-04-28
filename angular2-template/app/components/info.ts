import {Component} from 'angular2/core';

@Component({
    selector: 'info',
    template: `
        <h2>Info</h2>
    `
})
export class Info {
    constructor() {
        console.log('info component log');
    }
}
