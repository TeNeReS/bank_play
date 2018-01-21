var bankApp = angular.module('bankApp', ['ngRoute', 'ngResource']);

bankApp.config(function($routeProvider){
    $routeProvider
        .when('/',{
            templateUrl:'template/home.html',
            controller:'mainController'
        })
        .when('/persons',{
            templateUrl:'template/persons.html',
            controller:'personsController'
        })
        .otherwise({
            redirectTo:'/'
        });
});

bankApp.factory('Transaction', function($resource) {
    return $resource('transactions', {}, {query: {isArray: true, method: 'GET', transformResponse: function (data) {
        return angular.fromJson(data).content;}}
    });
});

bankApp.factory('Person', function($resource) {
    return $resource('persons');
});

bankApp.factory('Account', function($resource) {
    return $resource('persons/:id/accounts', {});
});

bankApp.controller('mainController', function($scope) {

});

bankApp.controller('personsController', function($scope, Person) {
    $scope.persons = Person.query();
    $scope.editPerson = {};
    $scope.submit = function() {
        var newPerson = $scope.editPerson;
        Person.save(newPerson)
            .$promise.then(function(personFromServer) {
            $scope.persons.push(personFromServer);
        });
        $scope.editPerson = {};
    };
});

bankApp.controller('transactionsController', function($scope, $filter, Transaction) {
    $scope.currentPage = 1;
    $scope.size = 2;
    $scope.getTransactions = function () {
        if ($scope.currentPage >= 1) {
            var startDate = $filter('date')($scope.startDate, "yyyy-MM-dd'T'HH:mm:ss");
            var endDate = $filter('date')($scope.endDate, "yyyy-MM-dd'T'HH:mm:ss");
            $scope.transactions = Transaction.query({page: $scope.currentPage - 1, size: $scope.size, startDate: startDate, endDate: endDate})
        }
    };
    $scope.getTransactions();
});

bankApp.controller('accountsController', function($scope, $route, Account, Transaction) {
    $scope.accounts = Account.query({id: $route.current.params.id});
    $scope.editAccount = {};
    $scope.newInternalTransaction = {};
    $scope.newExternalTransaction = {};
    $scope.newDebitTransaction = {};
    $scope.newRefillTransaction = {};
    $scope.addAccount = function() {
        var newAccount = $scope.editAccount;
        Account.save({id: $route.current.params.id}, newAccount)
            .$promise.then(function(accountFromServer) {
            $scope.accounts.push(accountFromServer);
        });
        $scope.editAccount = {};
    };

    $scope.transfer = function(newTransaction) {
        Transaction.save(newTransaction)
            .$promise.then(function() {
            $scope.accounts = Account.query({id: $route.current.params.id});
        });
        $scope.newInternalTransaction = {};
        $scope.newExternalTransaction = {};
        $scope.newDebitTransaction = {};
        $scope.newRefillTransaction = {};
    };
});