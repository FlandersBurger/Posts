angular.module('app')
.controller('PrioritizeCtrl', function ($scope, $location, CategoriesSvc) {

  $scope.priorityList = CategoriesSvc.getPriorityList()

  if (!$scope.priorityList) {
    $location.path('/lists')
  } else {
    $scope.currentChoice = 0
    $scope.done = false
  }

  $scope.makeChoice = function(choice) {
    $scope.priorityList[$scope.currentChoice].choice = choice === 1 ? $scope.priorityList[$scope.currentChoice].firstChoice : $scope.priorityList[$scope.currentChoice].secondChoice
    for (var i = 0; $scope.priorityList.length; i++) {
      if ($scope.priorityList[i].choice === '') {
        $scope.currentChoice = i
        return
      }
    }
    $scope.done = true
  }

  $scope.setCurrentChoice = function(choice) {
    $scope.currentChoice = choice
  }

  $scope.getButtonClass = function(choice) {
    if ($scope.priorityList[$scope.currentChoice].choice === '') {
      return 'btn-primary'
    }
    if (choice === 1) {
      return $scope.priorityList[$scope.currentChoice].firstChoice === $scope.priorityList[$scope.currentChoice].choice ? 'btn-success' : 'btn-danger'
    } else {
      return $scope.priorityList[$scope.currentChoice].secondChoice === $scope.priorityList[$scope.currentChoice].choice ? 'btn-success' : 'btn-danger'
    }
  }

})
