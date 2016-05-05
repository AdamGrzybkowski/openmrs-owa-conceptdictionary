/*
 * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/. OpenMRS is also distributed under
 * the terms of the Healthcare Disclaimer located at http://openmrs.org/license.
 *
 * Copyright (C) OpenMRS Inc. OpenMRS is a registered trademark and the OpenMRS
 * graphic logo is a trademark of OpenMRS Inc.
 */
SourceEditController.$inject = ['sources','openmrsRest', '$location'];

export default function SourceEditController (sources ,openmrsRest, $location){

    var vm = this;
    
    vm.links = {};
    vm.links["Concept Dictionary"] = "";
    vm.links["Concept Source Management"] = "source/";
    vm.links["Concept Source Form"] = "source/"+sources.uuid;
    
    vm.responseMessage = '';

    vm.cancel = cancel;
    vm.save = save;
    vm.retire = retire;
    vm.unretire = unretire;
    vm.deleteForever = deleteForever;
    vm.showAlert = showAlert;
    vm.updateDeleteConfirmation = updateDeleteConfirmation;
    
    activate();
    
    function activate(){
        vm.source = sources;
    	if(angular.isDefined(vm.source.auditInfo)&&
    	   angular.isUndefined(vm.source.auditInfo.retireReason)){
    			vm.source.auditInfo.retireReason = ""; 
    	}
    }

    function cancel () {
        $location.path('/source');
    }

    //Method used to add class with current class params
    function save() {
        vm.json = angular.toJson(vm.source);
        openmrsRest.update('conceptsource', {uuid: vm.source.uuid}, vm.json).then(function(success) {
            vm.success = true;
            $location.path('/source').search({sourceSaved: vm.source.name});
        });
    }

    function retire() {
        openmrsRest.retire('conceptsource', {uuid: vm.source.uuid}).then(function() {
            cancel();
        });
    }

    function unretire() {
        openmrsRest.unretire('conceptsource', {uuid: vm.source.uuid}).then(function() {
            cancel();
        });
    }
    
    
    /**
     * Logic for delete-alert component
     */
    vm.deleteClicked = false;
    function deleteForever() {
        openmrsRest.remove('conceptsource', {uuid : vm.source.uuid, purge : true}).then(function(){
            $location.path('/source').search({sourceDeleted: vm.source.name});
        });
    }
    function showAlert(item) {
        vm.deleteClicked = true;
    }
    function updateDeleteConfirmation(isConfirmed) {
        if (isConfirmed) {
        	deleteForever();
        }
        vm.deleteClicked = false;
    }
}