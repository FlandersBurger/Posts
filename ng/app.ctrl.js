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

  $scope.$on('update', function (_, user) {
    $scope.currentUser = user
  })

  $scope.$on('popup', function(_, message) {
    $scope.popupMessage = message.message
    $scope.popupType = message.type
    $("#appPopup")
    .css({"top": 0})
    .fadeIn(200)
    .delay(500)
    .fadeOut(1000, function() {
      $("#appPopup").hide().css({"top": -100})
    })
  })

  $scope.logout = function () {
    UserSvc.logout()
    $scope.loggedIn = false
    $scope.currentUser = null
    $location.path('home');
  }

})
