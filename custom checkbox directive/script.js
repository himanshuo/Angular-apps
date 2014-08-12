var app = angular.module('myApp', []);
app.directive('customCheckbox', function() {
  return {
    restrict: 'AEC',
    scope: true,
    templateUrl: 'customCheckbox.html',
    controller: ['$scope', '$attrs',
      function($scope, $attrs) {
        //if no values attribute given then use default value. (Probably will want to remove default value since sooo specific)
        
        
        
        //holds values (the string for each checkbox) and boolean (whether its checked or not).
        $scope.values = {};

        //allow people to make custom values to be used for checkbox. if no values="seperate,by,comma,stuff" attribute provided to
        //<custom-checkbox></custom-checkbox> then default value used.
        if ($attrs.values == null) {

          $scope.values["Organizational communication is needed around this topic area"] = false;
          $scope.values["Organizational training is needed around this topic area"] = false;
          $scope.values["I can personally help improve this topic area"] = false;
        } else {

          $scope.temp = $attrs.values.split(",");
          for (var key in $attrs.values.split(",")) {

            $scope.values[$scope.temp[key]] = false;

          }
        }
//if clicked then reverse value
        $scope.clicked = function(key) {
          $scope.values[key] = !$scope.values[key];


        };




      }
    ]
  };
});