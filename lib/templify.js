var Template = require("./template").Template;
var Rules = require("./rules").Rules;
var when = require("promised-io/promise").when;
var JSON = require("perstore/util/json-ext");

exports.TemplateEngine=function(options){
	var resolver = options.resolver(options.store)
	options.resolver = resolver;	
	options.rules = Rules(options);
	var engine = {
		compile: function(id, extra){
			//console.log("Setup Template: ", id, extra, resolver);
			var template = Template(resolver(id,false,extra), options);
			return template;
		}
	}		

	return engine;
}

exports.Resolver = require("./resolver").Resolver;

exports.renderTemplate = function(templateString, context, options){
	print("renderTemplate");
	
	var template = new Template((typeof templateString=='array')?templateString:[templateString], options);
	return template(context);
};

exports.getTemplateFunction = function(templateString, options){
	var template = new Template((typeof templateString=='array')?templateString:[templateString], options);
	return template.toString();
};
