# Understanding hybrid Angular 1 + 2 app

Our first step in upgrading is **understanding**.

*There are many differences between Angular 1 & 2 and understanding the differences is essential in making a succesfull upgrade. This document aims to explore the differences between the two frameworks and explain how a hybrid Angular 1 + 2 application works to transition smoothly from Angular 1.x to Angular 2 step-by-step that runs both frameworks simultaneously.*

## Upgrading with the Upgrade Adapter

The upgrade module in Angular 2 allows us to mix Angular 1 and 2 components in the same application and have them interoperate seamlessly. 

The UpgradeAdapter is a service that can bootstrap and manage hybrid applications that support both Angular 1 and Angular 2 code.

### Dependency injection

There are key differences with dependency injection in Angular 1 and Angular 2. The UpgradeAdapter resolves these differences and makes everything work seamlessly:

* We can make Angular 1 services available for injection to Angular 2 by _upgrading_ them (see: upgrading guide). The same singleton instance is shared between the frameworks. (These will live in the Angular 2 root injector, will be available to all components and will always have the same string tokens they have in Angular 1)

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

Change detection in Angular 1 happens after every event, with `scope.$apply()`. 
In Angular 2, code runs in the Angular Zone and no one needs to call `scope.$apply()`. Angular always knows when the code finishes and needs to kick of change detection. 

* In hybrid apps, everything runs in the Angular 2 Zone, whether the event originated in Angular 1 or Angular 2 code and the Zone triggers change detection after every event.
* The UpgradeAdapter will invoke the Angular 1 $rootScope.$apply() after every turn of the Angular zone.

This means we do not need to call `$apply()`, `UpgradeAdapter` does it for us. Those calls don't have any effect in an hybrid app.

When we use an Angular 2 component in Angular 1 and vice versa, the inputs will be watched using Angular 2 change detection.
Correspondingly, when we upgrade an Angular 1 component and use it from Angular 2, its bindings  will be hooked into Angular 2 change detection.
