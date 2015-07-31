angular.module('app')
.controller('ListsCtrl', function ($scope, TaskSvc) {

  TaskSvc.getCategories()
  .success(function (categories) {
    $scope.categories = categories
  })

  TaskSvc.getTasks()
  .success(function (tasks) {
    $scope.tasks = tasks
  })

  $scope.getTasks = function($query, category) {
    var test = $scope.tasks.filter(function(task) {
      return task.name.toLowerCase().indexOf($query.toLowerCase()) != -1 && task.category === category;
    })
    console.log(test);
    return test
  }

})
