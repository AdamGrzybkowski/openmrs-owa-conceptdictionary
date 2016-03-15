(function(){
	'use strict';
	
	angular
		.module('conceptDictionaryApp')
		.controller('DrugAddController', DrugAddController)
		
	DrugAddController.$inject = 
		['$location', 'openmrsRest']
	
	function DrugAddController($location, openmrsRest){
		
		var vm = this;
		
		vm.name;
		vm.concept;
		vm.combination;
		vm.dosageForm;
		vm.strength;
		vm.minDose;
		vm.maxDose;
		vm.route;
		
		vm.redirectToList = redirectToList;
		
		vm.saveDrug = saveDrug;
		
		function saveDrug(){
			
		}
		
		function redirectToList(){
			$location.path('/drugs-list');
		}
	};
	
})();