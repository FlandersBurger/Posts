angular.module('app')
.service('TaskSvc', function($http) {

  var svc = this

  svc.getTasks = function () {
    return $http.get('/api/tasks')
  }

  svc.getCategories = function () {
    return $http.get('/api/tasks/categories')
  }

})
