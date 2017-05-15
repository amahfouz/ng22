//
// Generates an Angular 2 service for CRUD operations on an entity
//

// Usage:
//  
// gen-ng2-entity-service <entity-name-in-lower-case>

var fs = require('fs');
var path = require('path');
var handlebars = require('handlebars');

// parse command line
if (process.argv.length < 3) {
    console.log("Specify the name of the entity.");
    process.exit(1);
}

// first two args are the path to node and the path to this script

var entityName = process.argv[2].toLowerCase();

// capitalize first letter
var entityNameInitCap = entityName.charAt(0).toUpperCase() + entityName.slice(1);

// load the template
var templatePath = path.join(__dirname, 'template', 'some.service.ts');
var serviceTemplate = fs.readFileSync(templatePath, 'utf8');
var template = handlebars.compile(serviceTemplate);

// create model
var ctx = {
  'entity-lower' : entityName,
  'entity-upper': entityNameInitCap 
};

// do the replacement
var serviceFile = template(ctx);

// redirect output to file as desired
console.log(serviceFile);
