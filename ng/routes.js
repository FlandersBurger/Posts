angular.module('app')
.config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/home');

  $stateProvider

  .state('home', {
    url: '/home',
    controller: 'PostsCtrl',
    templateUrl: 'posts.html'
  })
  .state('register', {
    url: '/register',
    controller: 'RegisterCtrl',
    templateUrl: 'register.html'
  })
  .state('login', {
    url: '/login',
    controller: 'LoginCtrl',
    templateUrl: 'login.html'
  })
  .state('profile', {
    url: '/profile',
    controller: 'ProfileCtrl',
    templateUrl: 'profile.html'
  })


})
