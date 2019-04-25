'use strict';

require.config({
  paths: {
    /**
     * Bundles from our assets/ directory in ngconf-app dist
     */
    angular: './angular.min', // AngularJS
    'ngconf-app': '../main',
    rxjs: './rxjs/rxjs.umd',
    '@angular/core': './core/bundles/core.umd',
    '@angular/compiler': './compiler/bundles/compiler.umd',
    '@angular/common': './common/bundles/common.umd',
    '@angular/platform-browser':
      './platform-browser/bundles/platform-browser.umd',
    '@angular/platform-browser-dynamic':
      './platform-browser-dynamic/bundles/platform-browser-dynamic.umd',
    '@angular/elements': './elements/bundles/elements.umd',
    '@ngrx/store': './store/bundles/store.umd',
    ocLazyLoad: './ocLazyLoad',
    /**
     * Examples of other legacy dependencies you may have in your
     * AngularJS app...
     */
    lodash: '../bower_components/lodash/lodash.min',
    jsencrypt: '../bower_components/jsencrypt/bin/jsencrypt.min',
    jquery: '../bower_components/jquery/dist/jquery.min'
  },
  shim: {
    angular: {
      exports: 'angular'
    },
    someExampleLegacyCodeReference: ['angular', 'lodash', 'jquery']
  },
  priority: ['angular']
});

/**
 * Needed to resolve 'rxjs/operators' AMD references in Angular UMDs
 */
define('rxjs/operators', ['rxjs'], function(rxjs) {
  return rxjs.operators;
});

/**
 * Load our application code
 */
require(['require', 'angular'], function(require, ng) {
  require(['ocLazyLoad'], function() {
    /**
     * Example angular.js app setup (used in index.html)
     */
    angular
      .module('legacyApp', ['oc.lazyLoad'])
      .config([
        '$ocLazyLoadProvider',
        function($ocLazyLoadProvider) {
          console.log('AngularJS config');
          $ocLazyLoadProvider.config({
            jsLoader: require
          });
        }
      ])
      .controller('AppController', [
        '$scope',
        '$ocLazyLoad',
        ($scope, $ocLazyLoad) => {
          $scope.foo = true;

          $scope.onTeamAButtonClick = () => {
            console.log('Trigger team-a bundle file load...');
            return $ocLazyLoad.load({
              serie: true,
              files: [
                '/dist/apps/ngconf-app/deployable-units/team-a/ngconf-app-team-a.umd.js'
              ]
            });
          };

          $scope.onTeamBButtonClick = () => {
            console.log('Trigger team-b bundle file load...');
            return $ocLazyLoad.load({
              serie: true,
              files: [
                '/dist/apps/ngconf-app/deployable-units/team-b/ngconf-app-team-b.umd.js'
              ]
            });
          };
        }
      ]);

    /**
     * Only bootstrap the AngularJS once we are sure that the ngconf Angular app
     * has been bootstrapped
     */
    window.__NGCONF_APP_SHARED_CONTEXT__.onNgconfAppBootstrapped(function() {
      ng.bootstrap(document, ['legacyApp']);

      // Notify consumers that AngularJS has been bootstrapped
      window.__NGCONF_APP_SHARED_CONTEXT__.setAngularJSBootstrapped();
    });
  });
});

console.log('Loading ngconf-app...');
require(['ngconf-app']);
