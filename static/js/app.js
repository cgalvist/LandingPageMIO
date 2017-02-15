angular.module("app",['ngMaterial','ui.router'])

.config(function($stateProvider, $urlRouterProvider, $mdThemingProvider) {

    // configurar tema de Angular Material
    $mdThemingProvider.theme('customTheme')
                   .primaryPalette('orange')
                   .accentPalette('grey')
                   .dark();

    //configurar rutas de la pagina
    $urlRouterProvider.otherwise('webCG/inicio');

    $stateProvider

        // paginas prncipales
        .state('webCG', {
            url: '/webCG',
            abstract: true,
            templateUrl: 'templates/menu.html',
            controller: 'toolbarCtrl'
        })

        .state('webCG.inicio', {
            url: '/inicio',
            views: {
                'contenidoMenu': {
                    templateUrl: 'templates/inicio.html',
                    controller: 'inicioCtrl',
                }
            }
        })

        .state('webCG.productos', {
            url: '/productos',
            views: {
                'contenidoMenu': {
                    templateUrl: 'templates/productos.html',
                }
            }
        })

        .state('webCG.catalogo', {
            url: '/catalogo',
            views: {
                'contenidoMenu': {
                    templateUrl: 'templates/catalogo.html',
                }
            }
        })

        .state('webCG.contacto', {
            url: '/contacto',
            views: {
                'contenidoMenu': {
                    templateUrl: 'templates/contacto.html',
                }
            }
        })

        // paginas de los grupos

        //maquinaria
        .state('webCG.maquinaria', {
            url: '/grupos/maquinaria',
            views: {
                'contenidoMenu': {
                    templateUrl: 'templates/grupos/maquinaria/inicio.html',
                    controller: 'maquinariaCtrl',
                }
            }
        })

        //invernaderos
        .state('webCG.invernaderos', {
            url: '/grupos/invernaderos',
            views: {
                'contenidoMenu': {
                    templateUrl: 'templates/grupos/invernaderos/inicio.html',
                    controller: 'invernaderosCtrl',
                }
            }
        })

        //formaletas
        .state('webCG.formaletas', {
            url: '/grupos/formaletas',
            views: {
                'contenidoMenu': {
                    templateUrl: 'templates/grupos/formaletas/inicio.html',
                    controller: 'formaletasCtrl',
                }
            }
        })
});
