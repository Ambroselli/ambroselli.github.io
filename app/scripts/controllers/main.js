'use strict';

angular.module('blogApp')
  .controller('MainCtrl', function ($scope, $window, Posts, $routeParams, progressbar) {
    $scope.appTitle = "YOUR BLOG NAME";
    $scope.appSubtitle = "YOUR SUBTITLE";

    $window.document.title = $scope.appTitle;

    Posts.getPosts(function(data){
      $scope.posts = data;
    });

    $scope.$on(
        "$routeChangeSuccess",
        function( $currentRoute, $previousRoute ){
            if( $routeParams.postTitle ){
              progressbar.start();

              Posts.getBySlug($routeParams.postTitle, function(data){
                $scope.post = data[0];
                progressbar.complete();
                $window.document.title = $scope.post.title + " | " + $scope.appTitle;
              });
            } else {
              $window.document.title = $scope.appTitle;
            }
        }
    );

  });
