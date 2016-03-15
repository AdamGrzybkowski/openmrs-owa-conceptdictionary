(function(){
	'use strict';
	
	angular
		.module('conceptDictionaryApp')
		.controller('DrugsListController', DrugsListController)
		
	DrugsListController.$inject = 
		['loadDrugs', '$location', 'openmrsRest']
		
	function DrugsListController(loadDrugs, $location, openmrsRest){
		
		var vm = this;
		
		vm.drugList;
		
		vm.gotToAddDrugPage = gotToAddDrugPage;
		
		activate();
		
		function activate(){
			vm.drugsList = loadDrugs;
		}
		
		function gotToAddDrugPage(hash){
			$location.path(hash);
		}
		
	};
	
})();