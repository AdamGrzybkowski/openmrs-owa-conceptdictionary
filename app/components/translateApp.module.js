/*
 * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/. OpenMRS is also distributed under
 * the terms of the Healthcare Disclaimer located at http://openmrs.org/license.
 *
 * Copyright (C) OpenMRS Inc. OpenMRS is a registered trademark and the OpenMRS
 * graphic logo is a trademark of OpenMRS Inc.
 */
import angularTranslate from 'angular-translate';

import messagesEn from '../translation/messages_en.json';
import messagesEs from '../translation/messages_es.json';

export default angular
    .module('translateApp', ['pascalprecht.translate'])
    .config(['$translateProvider', translateAppConfig]);

function translateAppConfig($translateProvider) {
		$translateProvider.translations ('en', messagesEn);
    	$translateProvider.translations ('es', messagesEs);
        $translateProvider.fallbackLanguage('en');
        $translateProvider.preferredLanguage('en');
}