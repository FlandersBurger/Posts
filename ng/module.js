angular.module('app', [
  'ui.router',
  'ui.bootstrap',
  'ngResource',
  'ngTagsInput',
  'ngAnimate',
  'tc.chartjs'
])
.directive('animateOnChange', function($timeout) {
  return function(scope, element, attr) {
    scope.$watch(attr.animateOnChange, function(nv,ov) {
      if (nv!=ov) {
        element.addClass('changed');
        $timeout(function() {
          element.removeClass('changed');
        }, 200); // Could be enhanced to take duration as a parameter
      }
    });
  };
});
