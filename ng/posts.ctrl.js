angular.module('app')
.controller('PostsCtrl', function ($scope, $filter, PostsSvc) {

  $scope.addPost = function () {
    if ($scope.postBody) {
      PostsSvc.create({
        body: $scope.postBody
      }).success(function (post) {
        $scope.postBody = null
      })
    }
  }

  PostsSvc.fetch()
  .success(function (posts) {
    $scope.posts = posts
    $scope.filteredPosts = posts
  })

  $scope.$on('ws:new_post', function (_, post) {
    $scope.$apply(function () {
      PostsSvc.getPost(post)
      .then(function (response) {
        $scope.posts.unshift(response.data)
      })
    })
  })

  var searchMatch = function (haystack, needle) {
    if (!needle) {
      return true;
    }
    return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
  };

  // init the filtered items
  $scope.search = function () {
    $scope.filteredPosts = $filter('filter')($scope.posts, function (post) {
      if (searchMatch(post.body, $scope.query)) {
        return true;
      }
      return false;
    });
  };

})
