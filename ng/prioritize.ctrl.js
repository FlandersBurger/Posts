angular.module('app')
.controller('PrioritizeCtrl', function ($scope, $location, CategoriesSvc) {

  $scope.priorityList = CategoriesSvc.getPriorityList()

  if (!$scope.priorityList) {
    $location.path('/lists')
  } else {
    $scope.selectedQuestion = 1
    $scope.currentQuestion = 1
    $scope.done = false
  }

  $scope.makeChoice = function(choice) {
    for (var i = 0; i < $scope.priorityList.length; i++) {
      if ($scope.priorityList[i].id === $scope.selectedQuestion) {
        $scope.priorityList[i].choice = choice === 1 ? $scope.priorityList[i].firstChoice : $scope.priorityList[i].secondChoice
      }
    }
    if ($scope.selectedQuestion === $scope.currentQuestion) {
      $scope.currentQuestion = $scope.currentQuestion === $scope.priorityList.length ? 1 : $scope.currentQuestion + 1
    }
    $scope.selectedQuestion = $scope.currentQuestion
    var found = false
    for (var i = 0; i < $scope.priorityList.length; i++) {
      if ($scope.priorityList[i].choice === '') {
        found = true
        break
      }
    }
    if (!found) {
      $('#prioritizeChoices').hide(300)
      $scope.done = true
    }
  }

  $scope.getButtonValue = function(choice) {
    if (!$scope.priorityList) {
      return ''
    }
    for (var i = 0; i < $scope.priorityList.length; i++) {
      if ($scope.priorityList[i].id === $scope.selectedQuestion) {
        return choice === 1 ? $scope.priorityList[i].firstChoice : $scope.priorityList[i].secondChoice
      }
    }
  }

  $scope.selectQuestion = function(question) {
    $scope.selectedQuestion = question
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
      if ($scope.priorityList[i].id === $scope.selectedQuestion) {
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

  $scope.showChoices = function() {
    $('#prioritizeChoices').show(1000)
    $('#reviewChoices').hide()
  }

})
