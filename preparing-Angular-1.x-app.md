# Preparing Angular 1.x app 

Our second step in upgrading is **preparation**.

## Following the angular style guide

1. **Rule of 1**: one component per file, allow us to migrate between languages and frameworks one at a time.
2. **Folders-by-Feature & Modularity**: similar principles on higher level of abstraction. 
Different parts of the applications should reside in different directories and modules.

_When an application is laid out feature per feature in this way, it can also be migrated one feature at a time._

## Using a module loader

When we break application code down into one component per file, we end up with many small files. 
Using a module loader such as SystemJS, Webpack, or Browserify allows us to use the module systems of Typescript or ES6.
*For ES5 applications we can use CommonJS style `require` and `module.exports` features.*

## Migrating to typescript

We want to bring in TypeScript and its compiler even before the upgrade itself begins.
This means we can start using TypeScript features in our Angular 1 code.

"switching" to TypeScript doesn't necessarily require anything more than installing the TypeScript compiler and switching renaming files from `.js` to `.ts`
The following additional steps start to add real value:

1. For applications that use a module loader use *ES6* `import` and `export` to organize code into modules.
2. Type annotations can be gradually added to existing functions and variables.
3. Use *ES6* `let` and `const`, default function parameters, and destructuring assignments.
4. Services and controllers can be turned into classes.

## Using component directives

In Angular 2, components are the main primitive from which user interfaces are built. 
In Angular 1, use component directives that define their own templates, controllers, and input/output bindings - the same things that Angular 2 components define.

An Angular 1 component directive should configure these attributes:

1. `restrict: 'E'` - Components are usually used as elements.
2. `scope: {}` - an isolate scope. In Angular 2, components are always isolated.
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

An Angular 1 component directive that is fully aligned with Angular 2 architecture:

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

Angular 1.5 introduces the component API:

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
