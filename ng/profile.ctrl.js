angular.module('app')
.controller('ProfileCtrl', function ($scope, $location, UserSvc) {

  $scope.changePassword = function (oldPassword, newPassword, confirmPassword) {
    /*
    UserSvc.login(username, password)
    .then(function (response) {
      $scope.$emit('login', response.data)
      $location.path('/');
    })
    */
  }

  $scope.updateUser = function (username) {

  }

})
