angular.module('app')
.controller('PrioritizeCtrl', function ($scope, $location, CategoriesSvc) {

  $scope.priorityList = CategoriesSvc.getPriorityList()

  if (!$scope.priorityList) {
    $location.path('/lists')
  } else {
    $scope.currentQuestion = 1
    $scope.done = false
  }

  $scope.makeChoice = function(choice) {
    for (var i = 0; i < $scope.priorityList.length; i++) {
      if ($scope.priorityList[i].id === $scope.currentQuestion) {
        $scope.priorityList[i].choice = choice === 1 ? $scope.priorityList[i].firstChoice : $scope.priorityList[i].secondChoice
      }
    }
    var found = false
    for (var i = 0; i < $scope.priorityList.length; i++) {
      if ($scope.priorityList[i].choice === '') {
        $scope.currentQuestion = $scope.priorityList[i].id
        found = true
        break
      }
    }
    if (!found) {
      $scope.currentQuestion = $scope.currentQuestion === $scope.priorityList.length ? 1 : $scope.currentQuestion + 1
      $scope.done = true
    }
  }

  $scope.getButtonValue = function(choice) {
    if (!$scope.priorityList) {
      return ''
    }
    for (var i = 0; i < $scope.priorityList.length; i++) {
      if ($scope.priorityList[i].id === $scope.currentQuestion) {
        return choice === 1 ? $scope.priorityList[i].firstChoice : $scope.priorityList[i].secondChoice
      }
    }
  }

  $scope.setCurrentQuestion = function(question) {
    $scope.currentQuestion = question
  }

  $scope.getFilteredPriorityList = function() {
    if (!$scope.priorityList) {
      return []
    }
    return $scope.priorityList.filter(function(question) {return question.choice !== '' || question.id === $scope.currentQuestion})
  }

  $scope.getChoicesMade = function() {
    if (!$scope.priorityList) {
      return ''
    }
    var choicesMade = 0
    for (var i = 0; i < $scope.priorityList.length; i++) {
      if ($scope.priorityList[i].choice !== '') {
        choicesMade++
      }
    }
    return choicesMade
  }

  $scope.getButtonClass = function(choice) {
    if (!$scope.priorityList) {
      return ''
    }
    for (var i = 0; i < $scope.priorityList.length; i++) {
      if ($scope.priorityList[i].id === $scope.currentQuestion) {
        if ($scope.priorityList[i].choice === '') {
          return 'btn-primary'
        }
        if (choice === 1) {
          return $scope.priorityList[i].firstChoice === $scope.priorityList[i].choice ? 'btn-success' : 'btn-danger'
        } else {
          return $scope.priorityList[i].secondChoice === $scope.priorityList[i].choice ? 'btn-success' : 'btn-danger'
        }
      }
    }
  }

})
