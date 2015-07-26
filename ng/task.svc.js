angular.module('app')
.service('TaskSvc', function($http) {

  var svc = this

  svc.getCategories = function () {
    return $http.get('/api/tasks/categories')
  }

})
