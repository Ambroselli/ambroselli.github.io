'use strict';

angular.module('blogApp')
  .controller('MainCtrl', function ($scope, $window, Posts, Config, $routeParams, progressbar) {

    Config.make();

    console.log($routeParams)

    $scope.$on(
        "$routeChangeSuccess",
        function( $currentRoute, $previousRoute ){

          $scope.params = $routeParams

            if( $routeParams.postTitle ){
              progressbar.start();
              Posts.getBySlug($routeParams.postTitle, function(data){

                $scope.post = data;
                progressbar.complete();
                $window.document.title = $scope.post.title + " - " + $scope.config.title;
              });
            } else {

              $window.document.title = $scope.config.title + " - " + $scope.config.description;

              Posts.getPosts(function(data){
                $scope.posts = data;
              });
            }
        }
    );

  })

  .filter('matchesCategory', function($routeParams) {
    return function(posts) {
      var result = {};
      if(!$routeParams.category) {
        return posts
      }
      angular.forEach(posts, function(post, key) {
        post.tags.forEach(function(category) {
          if (category.title.indexOf($routeParams.category) == 0) {
            result[key] = post;
          }
        });
      });

      return result;
    };
  });;
