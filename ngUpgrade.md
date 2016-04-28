# Upgrading Angular 1.x to Angular 2

One of the keys to a successful upgrade is to do it incrementally, 
by running the two frameworks side by side in the same application, 
and porting Angular 1 components to Angular 2 one by one. 

The upgrade module in Angular 2 has been designed to make incremental upgrading seamless.
Our first step in upgrading is **preparation**.

## Following the angular style guide

1. **Rule of 1**: one component per file, this will also allow us to migrate them between languages and frameworks one at a time.
2. **Folders-by-Feature & Modularity**: similar principles on higher level of abstraction. 
Different parts of the applications should reside in different directories and modules.

_When an application is laid out feature per feature in this way, it can also be migrated one feature at a time. And this is not just for the sake of the upgrade - it is just solid advice in general!_

## Using a module loader

When we break application code down into one component per file, we end up with many small files. 
Using a module loader such as SystemJS, Webpack, or Browserify allows us to use the module systems of Typescript or ES6.
For *ES5* applications we can use CommonJS style require and module.exports features.

## Migrating to typescript

We want to bring in TypeScript and its compiler even before the upgrade itself begins.
This means we can start using TypeScript features in our Angular 1 code.

"switching" to TypeScript doesn't necessarily require anything more than installing the TypeScript compiler and switching renaming files from *.js to *.ts
The following additional steps start to add real value:

1. For applications that use a module loader use *ES6* `import` and `export` to organize code into modules.
2. Type annotations can be gradually added to existing functions and variables to pin down their types (build-time error checking, autocompletion support and inline documentation)
3. Use *ES6* `let` and `const`, default function parameters, and destructuring assignments to make the code more expressive.
4. Services and controllers can be turned into classes. (Closer to Angular 2 service and component classes)

## Using component directives

In Angular 2, components are the main primitive from which user interfaces are built. 
You can also do this in Angular 1, using component directives. These are directives that define their own templates, controllers, and input/output bindings - the same things that Angular 2 components define.

An Angular 1 component directive should configure these attributes:

1. `restrict: 'E'` - Components are usually used as elements.
2. `scope: {}` - an isolate scope. In Angular 2, components are always isolated from their surroundings, and we should do this in Angular 1 too.
3. `bindToController: {}` - Component inputs and outputs should be bound to the controller instead of using the $scope.
4. `controller and controllerAs` - Components have their own controllers.
5. `template` or `templateUrl` - Components have their own templates.

Component directives may use: 
`transclude: true` - if the component needs to transclude content from elsewhere.
`require` - if the component needs to communicate with some parent component's controller.

Component directives may **NOT** use: 
`compile` - Not supported in Angular 2.
`replace: true` - Angular 2 never replaces an element with the template. Also deprecated in Angular 1.
`priority` and `terminal` - Not used in Angular 2.

An Angular 1 component directive that is fully aligned with Angular 2 architecture may look something like this:

    export function heroDetailDirective() {
        return {
            scope: {},
            bindToController: {
            hero: '=',
            deleted: '&'
            },
            template: `
            <h2>{{ctrl.hero.name}} details!</h2>
            <div><label>id: </label>{{ctrl.hero.id}}</div>
            <button ng-click="ctrl.onDelete()">Delete</button>
            `,
            controller: function() {
            this.onDelete = () => {
                this.deleted({hero: this.hero});
            };
            },
            controllerAs: 'ctrl'
        }
    }

Angular 1.5 introduces the component API which would look like this:
    export const heroDetail = {
        bindings: {
            hero: '=',
            deleted: '&'
        },
        template: `
            <h2>{{$ctrl.hero.name}} details!</h2>
            <div><label>id: </label>{{$ctrl.hero.id}}</div>
            <button ng-click="$ctrl.onDelete()">Delete</button>
        `,
        controller: function() {
            this.onDelete = () => {
            this.deleted(this.hero);
            };
        }
    };

## Upgrading with the Upgrade Adapter

With the upgrade module in Angular 2 we can mix and match Angular 1 and 2 components in the same application and have them interoperate seamlessly. 
That means we don't have to do the upgrade work all at once, since there's a natural coexistence between the two frameworks during the transition period.

The primary tool, UpgradeAdapter, is a service that can bootstrap and manage hybrid applications that support both Angular 2 and Angular 1 code.
We're really running _ both versions of Angular at the same time_. On top of that we can interoperate between both frameworks in three main areas: Dependency injection, the DOM, and change detection.

### Dependency injection

There are key differences with dependency injection in Angular 1 and Angular 2. The UpgradeAdapter resolves these differences and makes everything work seamlessly:
* We can make Angular 1 services available for injection to Angular 2 by _upgrading_ them. The same singleton instance is shared between the frameworks. (These will live in the Angular 2 root injector, will be available to all components and will always have the same string tokens they have in Angular 1)
* We can also make Angular 2 services available for injection to Angular 1 code by downgrading them. The same singleton instances are shared. (Only services from the Angular 2 root injector can be downgraded. Registering a downgrade, we explicitly specify a string token that we want to use in Angular 1)

### Components and the DOM

In the DOM of a hybrid application are components and directives from both Angular 1 and Angular 2. (They can communicate using the input and output bindings of their respective frameworks or through shared injected dependencies)
We need to keep in mind that:
1. Every DOM element is owned by exactly one of the two frameworks, the other framework ignores it. 
2. The root of the application is always an Angular 1 template.

So a hybrid application begins its life as an Angular 1 application, Angular 2 then steps into the picture when an Angular 2 component is used somewhere in the application templates.
We cross always cross boundaries between the two frameworks by one of the two ways:
1. An Angular 1 template using an Angular 2 component, or an Angular 2 template using an Angular 1 component.
2. Transcluding or projecting content from the other framework.

### Change detection

