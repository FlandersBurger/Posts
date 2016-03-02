angular.module('app')
.controller('ListsCtrl', function ($scope, CategoriesSvc) {

  CategoriesSvc.getCategories()
  .success(function (categories) {
    $scope.categories = categories
    $scope.tasks = []
    for (var i = 0; i < $scope.categories.length; i++) {
      for (var j = 0; j < $scope.categories[i].tasks.length; j++) {
        $scope.tasks.push({
          "category": $scope.categories[i].name,
          "task": $scope.categories[i].tasks[j].name
        })
      }
    }
  })

  $scope.selectCategory = function(category) {
    $scope.selectedCategory = category
    $scope.selectedTasks = []
    $scope.selectableTasks = []
    for (var i = 0; i < $scope.selectedCategory.tasks.length; i++) {
      $scope.selectableTasks.push($scope.selectedCategory.tasks[i])
    }
  }

  $scope.newTask = function (task) {
    CategoriesSvc.addTask($scope.selectedCategory.name, {
      task: task
    }).success(function () {
      $scope.selectedCategory.tasks.push({ name: task })
      $scope.addTask($scope.selectedTasks, $scope.selectedCategory.tasks[$scope.selectedCategory.tasks.length - 1])
      $scope.taskToAdd = null
    })
  }

  $scope.selectTask = function (task) {
    $scope.addTask($scope.selectedTasks, task)
    $scope.removeTask($scope.selectableTasks, task)
  }

  $scope.unselectTask = function (task) {
    $scope.addTask($scope.selectableTasks, task)
    $scope.removeTask($scope.selectedTasks, task)
  }

  $scope.addTask = function(taskList, task) {
    taskList.push(task)
  }

  $scope.removeTask = function(taskList, task) {
    taskList.splice(taskList.indexOf(task), 1)
  }

  $scope.startPrioritizing = function() {
    CategoriesSvc.setPriorityList($scope.selectedTasks)
  }

})
