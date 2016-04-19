var ref = new Firebase("https://teamoftems.firebaseio.com/");
angular.module("myApp", ["ngMaterial", "angular-sortable-view"])

    .controller("appController", function ($scope) {
        $scope.add;
        $scope.data = {

            Todo: [],
            Doing: [],
            Review: [],
            Done: []
        };



        $scope.AddTaskWalaButton = function (add) {
            //$scope.data.Todo.push($scope.add);
            ref.child('todo').push(add);
            
        }
        $scope.$watch('data.Todo', function (newValue, oldValue) {
            console.log("This is new", newValue, "This is old", oldValue);
            
            for (var i = 0; i <= (oldValue.length - 1); i++) {
                if (newValue[i] == oldValue[i]) {
                    console.log(true);
                }
                else {
                    console.log(oldValue[i]);
                    ref.child('doing').push(oldValue[i]);
                    //ref.child('todo').child("-KFiyGKrM-NihVqeJ8kf").set(null);
                    //  console.log(newValue[i-1]);
                    break;
                }
            }
        }, true);

        ref.child('todo').on('child_added', function (snap) {
            console.log(snap.val());
            $scope.data.Todo.push(snap.val());
            $scope.$digest();

        });
        ref.child('doing').on('child_added', function (snap) {
            console.log(snap.val());
            //$scope.data.Doing.push(snap.val());
            $scope.$digest();

        });
    });




