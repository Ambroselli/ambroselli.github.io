'use strict';

angular.module('blogApp')
  .factory('Config', function($http, $rootScope) {
    return{
      make: function(){
        this.getConfigFile(function(data){
          $rootScope.config = {};
          $rootScope.config.title = data.title;
          $rootScope.config.description = data.description;
        });
      },
      getConfigfile: function(callback){
        $http.get('config.json').success(callback);
      }
    }
  });
