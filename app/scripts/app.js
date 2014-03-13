'use strict';
angular.module('bpExperimentApp', ['bp', 'angular-loading-bar'])
  .config(function($urlRouterProvider, $stateProvider, bpAppProvider, cfpLoadingBarProvider) {
    bpAppProvider.setConfig({
      platform: localStorage.getItem('platform') || 'ios'
    });
    cfpLoadingBarProvider.includeSpinner = false;
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/home.html',
        data: {
          title: 'Welcome to Bradypodion'
        }
      })
      .state('authors', {
        url: '/authors',
        templateUrl: 'views/authors.html',
        controller: 'AuthorCtrl',
        data: {
          up: 'home'
        }
      })
      .state('author', {
        url: '/authors/:id',
        controller: 'AuthorCtrl',
        templateUrl: 'views/author.html',
      });
  });


angular.module('bpExperimentApp')
  .directive('themeToggle', function(bpApp, bpTap) {
    return function(scope, element) {
      var platforms = ['ios', 'android'];
      var tap = bpTap(element);

      element.addClass(bpApp.platform === 'ios' ? 'fa-android' : 'fa-apple');
      element.on('tap', function() {
        var index = platforms.indexOf(bpApp.platform);
        bpApp.platform = platforms[++index % 2];
        localStorage.setItem('platform', bpApp.platform);
        location.reload();
      });

      scope.$on('$destroy', function() {
        tap.disable();
      });
    };
  })
  .controller('SeedCtrl', function($scope) {
    $scope.href = function(href) {
      window.location = href;
    };
  })
  .controller('AuthorCtrl', function($scope, $state) {
    $scope.params = $state.params;
    $scope.authors = [
      {
        firstname: 'Stephan',
        lastname: 'Bönnemann',
        social: [
          {
            name: 'GitHub',
            user: 'boennemann',
            url: 'https://github.com/boennemann'
          },
          {
            name: 'Twitter',
            user: '@boennemann',
            url: 'https://twitter.com/boennemann'
          }
        ]
      },
      {
        firstname: 'David',
        lastname: 'Pfahler',
        social: [
          {
            name: 'GitHub',
            user: 'davidpfahler',
            url: 'https://github.com/davidpfahler'
          },
          {
            name: 'Twitter',
            user: '@davidpfahler',
            url: 'https://twitter.com/davidpfahler'
          }
        ]
      }
    ];
  });
