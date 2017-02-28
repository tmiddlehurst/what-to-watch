angular
	.module("whatToWatch", ['ui.router', 'firebase'])
	.config(MainRouter)

function AuthCatcher ($rootScope, $state) {
  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
    if (error === "AUTH_REQUIRED") $state.go('authrequired')
  })
}

function MainRouter ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/')

  var authRequired = {
    currentAuth: function (Auth) {
      return Auth.$requireSignIn()
    }
  }

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'js/states/home.html',
    })
    .state('movie', {
      url: '/movie',
      templateUrl: 'js/states/movie.html',
      resolve: authRequired
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'js/states/signup.html'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'js/states/login.html'
    })
    .state( 'authrequired', {
      url: '/authrequired',
      templateUrl: 'js/states/authrequired.html'
    })
}	