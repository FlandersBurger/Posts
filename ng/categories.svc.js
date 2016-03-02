angular.module('app')
.service('CategoriesSvc', function($http) {

  var svc = this

  svc.getCategories = function () {
    return $http.get('/api/categories')
  }

  svc.getTasks = function (category) {
    return $http.get('/api/categories/' + category)
  }

  svc.addTask = function (category, task) {
    return $http.post('/api/categories/' + category + '/tasks', task)
  }

})
