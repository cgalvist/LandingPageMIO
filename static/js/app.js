var app = angular.module("app",['ngMaterial','ui.router']);

app.config(function($stateProvider, $urlRouterProvider, $mdThemingProvider) {

    // configurar tema de Angular Material
    $mdThemingProvider.theme('customTheme')
                   .primaryPalette('orange')
                   .accentPalette('grey')
                   .dark();

    //configurar rutas de la pagina
    $urlRouterProvider.otherwise('webCG/inicio');

    $stateProvider

        .state('webCG', {
            url: '/webCG',
            abstract: true,
            templateUrl: 'templates/menu.html',
            controller: 'toolbarCtrl'
        })

        .state('webCG.inicio', {
            url: '/inicio',
            data: {
                title: 'Inicio'
            },
            views: {
                'contenidoMenu': {
                    templateUrl: 'templates/inicio.html',
                }
            }
        })

        .state('webCG.productos', {
            url: '/productos',
            data: {
                title: 'Productos y Servicios'
            },
            views: {
                'contenidoMenu': {
                    templateUrl: 'templates/productos.html',
                }
            }
        })

        .state('webCG.catalogo', {
            url: '/catalogo',
            data: {
                title: 'Catálogo'
            },
            views: {
                'contenidoMenu': {
                    templateUrl: 'templates/catalogo.html',
                    controller: 'catalogueCtrl'
                }
            }
        })

        .state('webCG.contacto', {
            url: '/contacto',
            data: {
                title: 'Contacto'
            },
            views: {
                'contenidoMenu': {
                    templateUrl: 'templates/contacto.html',
                }
            }
        })
});

app.run(['$rootScope', '$state',
        function ($rootScope, $state) {
            $rootScope.$on('$stateChangeSuccess', function () {
                $rootScope.title = $state.current.data.title;
            });
        }
    ]
);
