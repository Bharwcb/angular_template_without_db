// Angular logic

var app = angular.module('flapperNews', ['ui.router']);

app.config([ 
	'$stateProvider', 
	'$urlRouterProvider', 
	function($stateProvider, $urlRouterProvider) {

	$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: '/home.html',
			controller: 'MainCtrl'
		})

		.state('posts', {
			url: '/posts/{id}',
			// for inline templates, script="text/ng-template" id="this_templateUrl".  
			// now we can use any data/functions defined in that controller! 
			templateUrl: '/posts.html',
			controller: 'PostsCtrl'
		})

	$urlRouterProvider.otherwise('home');
}]);

app.factory('posts', [
	function() {
		// create object that can hold onto posts
		var o = {
			posts: []
		};
		return o;
	}
])

// injects posts factory into controller
app.controller('MainCtrl', [ '$scope', 'posts',
	// scope variable is bridge between angular controllers and angular templates (view). Here, scope defines list of posts. 
	// If you want something visible in template, BIND IT TO SCOPE!

	function($scope, posts){
		$scope.test = 'Hello world!';

		// posts.posts - first posts is factory, second is the key 'posts'. two-way data binding only applies to variables binded to scope.
		$scope.posts = posts.posts

		// $scope.addPost - example of passing function to view 
		$scope.addPost = function() {
			if ($scope.title === '') { return; }

			$scope.posts.push({
				title: $scope.title, 
				link: $scope.link,
				upvotes: 0,
				comments: [
					{author: 'Joe', body: 'Cool post!', upvotes: 0},
					{author: 'Sandra', body: 'Niiice', upvotes: 0}
				]
			});

			// clear inputs
			$scope.title = '';
			$scope.link = '';
		}

		$scope.incrementUpvotes = function(post) {
			post.upvotes += 1;
		}
	}
])

app.controller('PostsCtrl', ['$scope', '$stateParams', 'posts', function($scope, $stateParams, posts) {
	// need '$stateParams' to access route parameters
	// need 'posts' to access factory for 'posts'

	// **** in Posts Controller, set a scope object called post that grabs the appropriate post from the posts factory using the id from $stateParams ($stateParams grabs data from URL). THIS ALLOWS US TO USE 'POST' AS A VARIABLE IN THE TEMPLATE!!:
	$scope.post = posts.posts[$stateParams.id];

	$scope.addComment = function(){
	  if($scope.body === '') { return; }
	  $scope.post.comments.push({
	    body: $scope.body,
	    author: 'user',
	    upvotes: 0
	  });
	  $scope.body = '';
	};

	$scope.incrementUpvotes = function(comment) {
			comment.upvotes += 1;
	}

}])


;