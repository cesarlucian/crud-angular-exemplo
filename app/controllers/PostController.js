var URL = "http://localhost/angularjs-crud-exemplo";

app.controller('PostController', function($scope,$http){
 
  $scope.data = [];

  getResultsPage();

  function getResultsPage() {
    $http({
      url: URL + '/api/getData.php',
      method: 'GET'
    }).then(function(res){
      $scope.data = res.data.data;
    });
  }

  $scope.saveAdd = function(){
    $http({
      url: URL + '/api/add.php',
      method: 'POST',
      data: $scope.form
    }).then(function(data){
      $scope.data.push(data.data);
      $(".modal").modal("hide");
    });
  }

  $scope.edit = function(id){
    $http({
      url: URL + '/api/edit.php?id='+id,
      method: 'GET'
    }).then(function(data){
      $scope.form = data.data;
    });
  }

  $scope.saveEdit = function(){
    $http({
      url: URL + '/api/update.php?id='+$scope.form.id,
      method: 'POST',
      data: $scope.form
    }).then(function(data){
      $(".modal").modal("hide");
        $scope.data = apiModifyTable($scope.data,data.data.id,data.data);
    });
  }

  $scope.remove = function(habito,index){
    var result = confirm("Tem certeza que deseja deletar este habito?");
   	if (result) {
      $http({
        url: URL + '/api/delete.php?id='+habito.id,
        method: 'DELETE'
      }).then(function(data){
        $scope.data.splice(index,1);
      });
    }
  }
   
});