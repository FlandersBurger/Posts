angular.module('app')
.controller('AppCtrl', function ($scope, $location, UserSvc) {

  if (window.localStorage.token) {
    $scope.loggedIn = true
    UserSvc.setToken(window.localStorage.token)
    .then(function (response) {
      $scope.currentUser = response.data
    })
  } else {
    $scope.loggedIn = false
  }

  $scope.$on('login', function (_, user) {
    $scope.loggedIn = true
    $scope.currentUser = user
  })

  $scope.logout = function () {
    UserSvc.logout()
    $scope.loggedIn = false
    $scope.currentUser = null
    $location.path('/');
  }

})
