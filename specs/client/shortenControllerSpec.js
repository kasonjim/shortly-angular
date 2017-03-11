'use strict';

describe('ShortenController', function () {
  var $scope;
  var $rootScope;
  var $location;
  var createController;
  var $httpBackend;
  var Links;

  // using angular mocks, we can inject the injector
  // to retrieve our dependencies
  beforeEach(module('shortly'));
  beforeEach(inject(function ($injector) {

    // mock out our dependencies
    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
    Links = $injector.get('Links');
    $location = $injector.get('$location');

    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    createController = function () {
      return $controller('ShortenController', {
        $scope: $scope,
        Links: Links,
        $location: $location
      });
    };

    createController();
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should have a link property on the $scope', function () {
    expect($scope.link).to.be.an('object');
  });

  it('should have a addLink method on the $scope', function () {
    expect($scope.addLink).to.be.a('function');
  });

  it('should be able to create new links with addLink()', function () {
    $httpBackend.expectPOST('/api/links').respond(201, '');
    $scope.addLink();
    $httpBackend.flush();
  });
  it('should not allow shortening of invalid links before sending to server', function () {
    expect($scope.isValid).to.be.a('function');

    $scope.link.url = '';
    $scope.isValid();
    expect($scope.showError).to.equal(true);
    expect($scope.inputError).to.equal('URL cannot be empty');

    $scope.link.url = 'asdfasdf';
    $scope.isValid();
    expect($scope.showError).to.equal(true);
    expect($scope.inputError).to.equal('Please enter a valid URL');

    $scope.link.url = 'http://www.google.com';
    $scope.isValid();
    expect($scope.showError).to.equal(false);
  });
});
