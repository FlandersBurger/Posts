angular.module('app')
.controller('ListsCtrl', function ($scope, TaskSvc) {

  TaskSvc.getCategories()
  .success(function (categories) {
    $scope.categories = categories
  })

})
