'use strict';

angular.module('blogApp')
  .controller('MainCtrl', function ($scope, $window, Posts, $routeParams, progressbar) {
    $scope.appTitle = "Ambe";
    $scope.appSubtitle = "AngularJS + Markdown blog engine";

    $scope.$on(
        "$routeChangeSuccess",
        function( $currentRoute, $previousRoute ){

            if( $routeParams.postTitle ){
              progressbar.start();
              Posts.getBySlug($routeParams.postTitle, function(data){
                $scope.post = data;
                progressbar.complete();
                $window.document.title = $scope.post.title + " | " + $scope.appTitle;
              });
            } else {

              $window.document.title = $scope.appTitle;

              Posts.getPosts(function(data){
                $scope.posts = data;
              });
            }
        }
    );

  });
