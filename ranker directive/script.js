var app = angular.module('myApp', []);
app.directive('ranker', function() {
  return {
    restrict: 'AEC', //can be used as div attribute, element...
    templateUrl: 'ranker.html', //MUST MAKE THIS POINT TO ranker.html
    scope:true,
    controller: ['$scope', '$attrs',
      function($scope, $attrs) {
        //attribute values
        $scope.label = $attrs.label;
        $scope.max = parseInt($attrs.max);
        $scope.alreadyUsed = parseInt($attrs.alreadyUsed);

        //default values
        $scope.currentValue = parseInt($attrs.alreadyUsed);
        $scope.boxValue = 0;

        //add button clicked
        $scope.add = function() {
          $scope.boxValue++; // = $scope.boxValue+1; 
          $scope.currentValue = $scope.alreadyUsed + $scope.boxValue;
          //validation
          if ($scope.currentValue > $scope.max) {
            $scope.currentValue = $scope.max;
            $scope.boxValue = parseInt($scope.max - $scope.alreadyUsed);

          }


        };
        //subtract value clicked
        $scope.subtract = function() {
          $scope.boxValue--; // = $scope.boxValue+1; 
          $scope.currentValue = $scope.alreadyUsed + $scope.boxValue;
          //validation
          if ($scope.currentValue < $scope.alreadyUsed) {
            $scope.currentValue = $scope.alreadyUsed;
            $scope.boxValue = parseInt(0);

          }
        };
        //box value changed manually. 
        $scope.boxValueChanged = function() {
          //$scope.boxValue=num;// = $scope.boxValue+1; 
          $scope.currentValue = $scope.alreadyUsed + parseInt($scope.boxValue);

          //validation
          if ($scope.currentValue < $scope.alreadyUsed) {
            $scope.currentValue = $scope.alreadyUsed;
            $scope.boxValue = parseInt(0);
            //$scope.label = "<called"

          }

          if ($scope.currentValue > $scope.max) {
            $scope.currentValue = $scope.max;
            $scope.boxValue = parseInt($scope.max - $scope.alreadyUsed);
            //$scope.label = ">called"
          }



        };







      }
    ]
  };
});
//validation. make sure input number is an int. 
//Upper/lower bounds checked in "validation" regions above.
var INTEGER_REGEXP = /^\-?\d+$/;
app.directive('integer', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$parsers.unshift(function(viewValue) {
        if (INTEGER_REGEXP.test(viewValue)) {
          // it is valid
          ctrl.$setValidity('integer', true);
          return viewValue;
        } else {
          // it is invalid, return undefined (no model update)
          ctrl.$setValidity('integer', false);
          return undefined;
        }
      });
    }
  };
});