
require.config({
    baseUrl: 'js',
    paths: {
        'jquery': 'http://code.jquery.com/jquery-1.11.2.min',
        'handlebars': 'https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/3.0.0/handlebars.min',
        'markdown' :'markdown.min'
    },
    shim: {
    	'handlebars': {
	      'exports': 'Handlebars'
	    }
    }
});

var app = {};
app.util = (function(){
	var colors = [],
		languageColors = {};

	function randomColor(language) {
		var letters = 'ABCDE'.split(''),
			color = '#',
			i;
		language = language || 'other';
		if(languageColors[language]) {
			return languageColors[language];
		}
		do {
	    	for (i = 0; i < 3; i++) {
	        	color += letters[Math.floor(Math.random() * letters.length)];
	    	}
	    } while(colors.indexOf(color) !== -1);
	    colors.push(color);
	    languageColors[language] = color;

	    return color;
	}

	function render(templateSelector, data, targetElement) {
		var el = document.querySelector(templateSelector),
			contentEl = el.innerHTML,
			template = Handlebars.compile(contentEl),
			html = template(data);
		$(targetElement).html(html);
	}

	return {
		randomColor: randomColor,
		render: render
	}
})();


(function() {
	var createPubSub = function($) {
			var o = $({});
			$.subscribe = function() {
				o.on.apply(o, arguments);
			};
			$.unsubscribe = function() {
				o.off.apply(o, arguments);
			};
			$.publish = function() {
				o.trigger.apply(o, arguments);
			};
		},
		getDependecies = function($, handlebars) {
			createPubSub($);
			window.Handlebars = handlebars;
			require(['markdown', 'github_lib','main','nav', 'head'], function() {
				console.log('ready!!');
				app.github.getRepos();
				app.github.getUser();
			});
		};
	require(['jquery', 'handlebars'], getDependecies);
})();
