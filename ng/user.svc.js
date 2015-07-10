angular.module('app')
.service('UserSvc', function($http) {

  var svc = this

  svc.getUser = function () {
    return $http.get('/api/users')
  }

  svc.setToken = function (token) {
    $http.defaults.headers.common['X-Auth'] = token
    return svc.getUser()
  }

  svc.login = function (username, password) {
    return $http.post('/api/sessions', {
      username: username,
      password: password
    }).then(function (response) {
      window.localStorage.token = response.data
      return svc.setToken(response.data)
    })
  }

  svc.updateUser = function (gender) {
    return $http.post('/api/users/update', {
      gender: gender
    })
  }

  svc.checkPassword = function (password) {
    return $http.post('/api/users/passwordcheck', {
      password: password
    })
  }

  svc.changePassword = function (oldPassword, newPassword) {
    return $http.post('/api/users/passwordchange', {
      oldPassword: oldPassword,
      newPassword : newPassword
    })
  }

  svc.changeUsername = function (newUsername) {
    return $http.post('/api/users/username', {
      newUsername: newUsername
    })
  }

  svc.logout = function () {
    window.localStorage.clear()
    $http.defaults.headers.common['X-Auth'] = ''
  }

  svc.createUser = function (username, password) {
    return $http.post('/api/users', {
      username: username,
      password: password
    }).then(function () {
      return svc.login(username, password)
    })
  }

})
