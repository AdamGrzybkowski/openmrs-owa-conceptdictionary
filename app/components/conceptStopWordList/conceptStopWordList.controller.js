/*
 * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/. OpenMRS is also distributed under
 * the terms of the Healthcare Disclaimer located at http://openmrs.org/license.
 *
 * Copyright (C) OpenMRS Inc. OpenMRS is a registered trademark and the OpenMRS
 * graphic logo is a trademark of OpenMRS Inc.
 */

ConceptStopWordListController.$inject =
    ['$routeParams'];

export default function ConceptStopWordListController ($routeParams) {

    var vm = this;

    //Properties for list component
    vm.resource = "conceptstopword";
    vm.limit = 20; //Default
    vm.columns= [
        {
            "property": "display",
            "label": "Word"
        },
        {
            "property": "locale",
            "label":"Locale"
        }];
    vm.actions = [{
            "action":"purge",
            "label":"Delete",
            "icon":"icon-trash delete-action center"
    }];
    
    //Breadcrumbs properties
    vm.links = {};
    vm.links["Concept Dictionary"] = "";
    vm.links["Concept Stop Word Management"] = "conceptstopword/";
    

    //determines whether concept stop word has been added in previous view
    vm.conceptStopWordAdded = $routeParams.conceptStopWordAdded;
    
}