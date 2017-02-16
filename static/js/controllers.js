var last = {
    bottom: true,
    top: false,
    left: false,
    right: true
};

angular.module('app')

// controlador del menu responsive izquierdo
.controller('toolbarCtrl', ['$scope', '$timeout', '$mdSidenav', function($scope, $timeout, $mdSidenav) {

    $scope.toggleLeft = buildDelayedToggler('left');

    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
    function debounce(func, wait, context) {
        var timer;

        return function debounced() {
            var context = $scope,
                args = Array.prototype.slice.call(arguments);
            $timeout.cancel(timer);
            timer = $timeout(function() {
                timer = undefined;
                func.apply(context, args);
            }, wait || 10);
        };
    }

    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildDelayedToggler(navID) {
        return debounce(function() {
            // Component lookup should always be available since we are not using `ng-if`


            $mdSidenav(navID)
                .toggle()
                /*
              .then(function () {
                console.log("toggle " + navID + " is done");
            });*/
        }, 200);
    }

    $scope.close = function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav('left').close()
            /*
                .then(function () {
                console.log("close LEFT is done");
            });*/
    };
}])

// controlador del footer
.controller('footerCtrl', ['$scope', '$window', function($scope, $window) {

    $scope.thisYear = new Date().getFullYear();
    var menuContent = document.getElementById("menu-content");
    var container = angular.element(menuContent);
    $scope.isScroll = false;

    //verificar si el usuario ha hecho scroll para mostrar el boton "scroll top"
    container.on('scroll', function() {
        $scope.isScroll = menuContent.scrollTop > 100;
        $scope.$apply();
    });

    //boton para retornar a la parte de arriba de la pagina
    $scope.scrollTop = function(){
      menuContent.scrollTop = 0;
    }
}])

.controller('inicioCtrl', function($scope) {})
