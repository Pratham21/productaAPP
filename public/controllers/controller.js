var myApp = angular.module('myApp',['ngRoute']);

myApp.config(function($routeProvider){

    $routeProvider
    
    .when('/',{
        templateUrl: 'Pages/main.html'  
//       controller: 'AppCtrl'
        
    })
    .when('/addproduct',{
        templateUrl: 'Pages/add.html'
//        controller:'AppCtrl'
    })
    .when('/edit',{
        templateUrl: 'Pages/edit.html'
//        controller:'AppCtrl'
    })
    
    .otherwise('/',{
        templateUrl: 'Pages/edit.html'
        //controller:'AppCtrl'
    });
});
myApp.controller('AppCtrl',['$scope','$http','$log','$location',
                            function($scope,$http,$log,$location){
    console.log("i am controller");
    //$log.info($location.path());                            
    var refresh = function(){
                        
        $http.get('/productlist').success(function(response){
        
            console.log("i got data i requested");
            console.log(response);
            $scope.productlist= response;
            //$scope.product = "";
        })
    };
    refresh();
           $scope.product={};
           $scope.addProduct = function(){
           console.log($scope.product);
           $http.post('/productlist/' , $scope.product).success(function(response)
        {
             console.log(response); 
             $location.path('/');
            refresh();
        });
           $scope.product={};
       };  
    $scope.remove = function(id){
        console.log(id);
        $http.delete('/productlist/' + id).success(function(response){
        refresh();
        });
    };
   $scope.edit = function(id) {
       console.log(id);
       $location.path('/edit');
       $http.get('/productlist/' + id).success(function(response){
           console.log("got edit request");
           $scope.productEdit = response;
           console.log($scope.productEdit);
       });
       
   };
//        $scope.productEdit.category = "response";                        
    $scope.update = function(){
        console.log($scope.productEdit._id);
        $http.put('/productlist/' + $scope.productEdit._id,$scope.productEdit).success(function(response){
           $scope.productEdit = "";
            $location.path('#/');
            refresh();
        });
    
    };
    $scope.deselect = function() {
        $scope.productEdit ="";
    };
}]);


