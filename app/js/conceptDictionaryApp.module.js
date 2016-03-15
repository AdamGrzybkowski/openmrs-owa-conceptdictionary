angular
    .module('conceptDictionaryApp',
		['ngRoute', 'conceptDictServices', 'openmrs'])

.config(['$routeProvider',
                    function($routeProvider, openmrsRest) {
                      $routeProvider.
                        when('/concept-search', {
                            templateUrl: 'partials/concept-search.html',
                            controller: 'ConceptSearch',
                            controllerAs: 'vm'
                      }).
                        when('/class-list', {
                          templateUrl: 'partials/class-list.html',
                          controller: 'ClassesList',
                          controllerAs: 'vm',
                          resolve: {
                        	  loadClasses : loadClasses
                          }
                        }).
                        when('/class-list/add-class', {
                        	templateUrl: 'partials/class-add.html',
                            controller: 'ClassAdd',
                            controllerAs: 'vm'
                      }).
                        when('/class-list/:classUUID', {
                        	templateUrl: 'partials/class-edit.html',
                        	controller: 'ClassesEditController',
                        	controllerAs: 'vm',
                        	resolve: {
                        		singleClass : loadClass
                        	}
                        }).
                        when('/datatype-list', {
                        	templateUrl: 'partials/datatype-list.html',
                            controller: 'DataTypesListController',
                        	controllerAs: 'vm',
                            resolve: {
                              	 loadDataTypes : loadDataTypes
                            }
                        }).
                        when('/datatype-list/:dataTypeUUID', {
                        	templateUrl: 'partials/datatype-details.html',
                        	controller: 'DataTypesDetailsController',
                        	controllerAs: 'vm',
                        	resolve: {
                        		loadDataType : loadDataType
                        	}
                        }).
                        when('/concept/add/', {
                        	templateUrl: 'partials/concept-add.html',
                        	controller: 'ConceptAddController',
                        	controllerAs: 'vm',
                        	resolve: {
                        		serverLocales: serverLocales,
                        		loadClasses : loadClasses,
                        		loadDataTypes : loadDataTypes
                        	}
                        }).
                        when('/concept/:conceptUUID/', {
                        	templateUrl: 'partials/concept.html',
                        	controller: 'ConceptView',
                        	controllerAs: 'vm',
                        	resolve: {
                        		concept : loadConcept,
                        		serverLocales: serverLocales
                        	}
                        }).
                        when('/drugs-list', {
                        	templateUrl: 'partials/drugs-list.html',
                        	controller: 'DrugsListController',
                        	controllerAs: 'vm',
                        	resolve: {
                        		loadDrugs : loadDrugs
                        	}
                        }).
                        when('/drugs-list/add-drug', {
                        	templateUrl: 'partials/drug-add.html',
                        	controller: 'DrugAddController',
                        	controllerAs: 'vm'
                        }).
                        otherwise({
                          redirectTo: '/class-list'
                        });
                    }]);

function loadConcept ($route, openmrsRest){
	return openmrsRest.getFull('concept',
			{uuid : $route.current.params.conceptUUID});
};
function serverLocales(openmrsRest){
	return openmrsRest.getFull('systemsetting',{q : 'locale.allowed.list'})
					  .then(function(response){
						  return response.results[0].value.split(", ");
					  });
};
function loadClasses(openmrsRest){
	  return openmrsRest.listFull('conceptclass');
};
function loadDataTypes (openmrsRest){
	  return openmrsRest.listFull('conceptdatatype');
};
function loadClass ($route, openmrsRest){
	return openmrsRest.getFull('conceptclass',
			{uuid: $route.current.params.classUUID});
};
function loadDataType ($route, openmrsRest){
	return openmrsRest.getFull('conceptdatatype', 
			{uuid: $route.current.params.dataTypeUUID});
};
function loadDrugs (openmrsRest){
	return openmrsRest.listFull('drug');
}



