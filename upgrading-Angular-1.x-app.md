# Upgrading Angular 1.x to Angular 2

Our third and final step is **upgrading**.

One of the keys to a successful upgrade is to do it incrementally, 
by running the two frameworks side by side in the same application, and porting Angular 1 components to Angular 2 one by one.


## Bootstrapping Hybrid Angular 1+2 Applications

Before switching to hybrid mode, we want to switch out `ng-app` with `angular.bootstrap`. In Angular 2, only the second method is possible. This is also the case for hybrid applications. 

Say we have:

    <body ng-app="heroApp">

Let's replace that with:

    angular.bootstrap(document.body, ['heroApp']);

To then switch the application into hybrid mode, we must install Angular 2 to the project and instantiate the `UpgradeAdapter`

    import {UpgradeAdapter} from 'angular2/upgrade';
    /* . . . */
    const upgradeAdapter = new UpgradeAdapter();
    upgradeAdapter.bootstrap(document.body, ['heroApp']);

At this point we have a hybrid Angular 1+2 application! All the existing Angular 1 code will still work and we're ready to run Angular 2 code as well.
ng

*note that `upgradeAdapter.bootstrap` works **asynchronously** *

In the process of migrating we'll be using the `upgradeAdapter` throughout our application. It'll be important to use the *same* instance of the adapter.
It'll be useful to have a shared `upgradeAdapter` instance.

**upgrade_adapter.ts**

    import {UpgradeAdapter} from 'angular2/upgrade';
    export const upgradeAdapter = new UpgradeAdapter();
    
This shared instance can the be used in all the modules that need it:

    import {upgradeAdapter} from './upgrade_adapter';
    /* . . . */
    upgradeAdapter.bootstrap(document.body, ['heroApp'], {strictDi: true});
    
## Using Angular 2 components in Angular 1 code

Say we have a simple Angular 2 component:

    import {Component} from 'angular2/core';
        @Component({
        selector: 'hero-detail',
        template: `
            <h2>Windstorm details!</h2>
            <div><label>id: </label>1</div>
        `
        })
        export class HeroDetailComponent {
    }

To use this component in Angular 1 we just need to _downgrade_ it use the `upgradeAdapter`, the result is an Angular 1 **directive**.

    import {HeroDetailComponent} from './hero-detail.component';
    /* . . . */
    angular.module('heroApp', [])
    .directive('heroDetail', upgradeAdapter.downgradeNg2Component(HeroDetailComponent)); // tell the upgrade adapter to downgrade this component

What we have here is an Angular 1 directive which we can use like any other directive in our Angular 1 templates.

    <hero-detail></hero-detail>

*** 

Say we have an Angular 2 component that uses inputs and outputs:

    import {Component, Input, Output, EventEmitter} from 'angular2/core';
        import {Hero} from '../hero';
        @Component({
        selector: 'hero-detail',
        template: `
            <h2>{{hero.name}} details!</h2>
            <div><label>id: </label>{{hero.id}}</div>
            <button (click)="onDelete()">Delete</button>
        `
        })
        export class HeroDetailComponent {
        @Input() hero:Hero
        @Output() deleted = new EventEmitter<Hero>();
        onDelete() {
            this.deleted.emit(this.hero);
        }
    }
    
The inputs and outputs can be supplied from the Angular 1 template 

    <div ng-controller="MainController as mainCtrl"> <!-- Apply ng1 controller -->
        <hero-detail                                 <!-- Use ng2 component as ng1 directive -->
            [hero]="mainCtrl.hero"                   <!-- Pass input from ng1 ctrl to ng2 component with ng2 attribute binding -->
            (deleted)="mainCtrl.onDelete($event)"    <!-- Use output event with ng2 event binding and get object with `$event` -->
            ng-repeat="hero in mainCtrl.heroes">     <!-- Able to use ng1 directive -->
        </hero-detail>
    </div>

The `$event` variable can be used in outputs to gain access to the object that was emitted.
Note that **we're using Angular 2 attribute syntax** to bind the inputs and outputs inside our Angular 1 template. We can still use other Angular 1 directives on the elements like `ng-repeat`.

## Using Angular 1 Components in Angular 2 Code

We can _upgrade_ Angular 1 component directives and then use them in Angular 2.
The directive has to be a _component directive_. (see `Using component directives` in the preparation guide)

Say we have a simple Angular 2 component:

    export const heroDetail = {
        template: `
            <h2>Windstorm details!</h2>
            <div><label>id: </label>1</div>
        `,
        controller: function() {
        }
    };

Upgrading this component using the UpgradeAdapter's upgradeNg1Component method returns an Angular 2 component class. To use it from an Angular 2 component, we list it the in the directives metadata of the component:

    import {Component} from 'angular2/core';
    import {upgradeAdapter} from './upgrade_adapter';
    const HeroDetail = upgradeAdapter.upgradeNg1Component('heroDetail');
    @Component({
        selector: 'my-container',
        template: `
            <h1>Tour of Heroes</h1>
            <hero-detail></hero-detail>
        `,
        directives: [HeroDetail]
    })
    export class ContainerComponent {
    }

_Note that upgraded components always have an element selector, based on the original name of the Angular 1 component directive._

