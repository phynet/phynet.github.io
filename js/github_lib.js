app.github = (function() {
	var getUserName = function() {
		//http://username.github.io/
		var host = window.location.host || 'localhost',
			username;
		host = host.indexOf('localhost')!=-1? 'amcereijo.github.io':host;
		userName = host.replace(/.github.io/, '');
		return userName;
	},
	getReposUrl =  function() {
		return 'https://api.github.com/users/' + getUserName() +
			'/repos';
	},
	getRepos = function() {
		$.ajax({
			url: getReposUrl(),
			contentType: 'application/json'
		}).done(function(data) {
			$.publish('github/repo/data', {data:data});
		});
	};

	return {
		getRepos: getRepos
	};
})();