'use strict';

/* jasmine specs for openmrsRest service go here */
describe('OpenmrsRest service', function() {

    beforeEach(function(){
        jasmine.addMatchers({
            toEqualData: function(util, customEqualityTesters) {
                return {
                    compare: function(actual, expected) {
                        var passed = angular.equals(actual, expected);
                        return {
                            pass: passed,
                            message: 'Expected ' + actual + (passed ? '' : ' not') + ' to equal ' + expected
                        }
                    }
                }
            }
        });
    });

    beforeEach(module('conceptDictionaryApp'));

    describe('ListFull should retrun full representations', function(){
        var $httpBackend, openmrsRest, list;

        beforeEach(inject(function(_$httpBackend_, _openmrsRest_){
        	openmrsRest = _openmrsRest_;
            $httpBackend = _$httpBackend_;
            $httpBackend.whenGET('partials/index-menu.html').respond();
            $httpBackend.whenGET('/ws/rest/v1/item?v=full').
            respond({results:[{ name: 'item1',  
            					uuid: '2b22dc27-72ec-4ab5-9fa8-d98be91adc1c'},
            				  { name: 'item2', 
            					uuid: '3g65dc27-72ec-4ab5-9fa8-d98be91adb5b'},
            					{ name: 'item3', 
                				uuid: '6g65dc56-72ec-4ab5-9fa8-d98be91adb5b'}
            				]});      
            
            openmrsRest.listFull('item').then(function(resp){
            	list = resp;
            });
            
            $httpBackend.flush();
        }));
        
        it('should load items list', function(){
        	expect(list.results).toEqualData([{ name: 'item1',  
				            					uuid: '2b22dc27-72ec-4ab5-9fa8-d98be91adc1c'},
				            				  { name: 'item2', 
				            					uuid: '3g65dc27-72ec-4ab5-9fa8-d98be91adb5b'},
				            					{ name: 'item3', 
				                				uuid: '6g65dc56-72ec-4ab5-9fa8-d98be91adb5b'}]
				            				);
        });
    });
    describe('Get should retrun one item', function(){
        var $httpBackend, openmrsRest, item;

        beforeEach(inject(function(_$httpBackend_, _openmrsRest_){
        	openmrsRest = _openmrsRest_;
            $httpBackend = _$httpBackend_;
            $httpBackend.whenGET('partials/index-menu.html').respond();
            $httpBackend.whenGET('/ws/rest/v1/item/6g65dc56-72ec-4ab5-9fa8-d98be91adb5b').
            respond({ name: 'item3', 
                	uuid: '6g65dc56-72ec-4ab5-9fa8-d98be91adb5b'});
            
            openmrsRest.get('item', {uuid: '6g65dc56-72ec-4ab5-9fa8-d98be91adb5b'}).then(function(resp){
            	item = resp;
            });
            
            $httpBackend.flush();
        }));
        it('should load item3', function(){
        	expect(item).toEqualData({ name: 'item3', 
        								uuid: '6g65dc56-72ec-4ab5-9fa8-d98be91adb5b'});	
        });
    });
    describe('Create method should create new item', function(){
    	var $httpBackend, openmrsRest, POSTitem;

        beforeEach(inject(function(_$httpBackend_, _openmrsRest_){
	    	openmrsRest = _openmrsRest_;
	        $httpBackend = _$httpBackend_;
	        $httpBackend.whenGET('partials/index-menu.html').respond();
	        $httpBackend.whenPOST('/ws/rest/v1/item').
	        respond({ name: 'item4', 
	            	uuid: '6g65dc56-72ec-4ab5-9fa8-d98be91adb5b'});
	        
	        var newItem = angular.toJson({name:'item4',uuid: '6g65dc56-72ec-4ab5-9fa8-d98be91adb5b'});
	        openmrsRest.create('item', newItem).then(function(resp){
	        	POSTitem = resp;
	        });
	        
	        $httpBackend.flush();
    	}));
	    it('should create item4', function(){
	    	expect(POSTitem).toEqualData({ name: 'item4', 
	    								uuid: '6g65dc56-72ec-4ab5-9fa8-d98be91adb5b'});	
	    });
	});
    describe('Update method should update item with given uuid', function(){
    	var $httpBackend, openmrsRest, UPDATEitem;

        beforeEach(inject(function(_$httpBackend_, _openmrsRest_){
	    	openmrsRest = _openmrsRest_;
	        $httpBackend = _$httpBackend_;
	        $httpBackend.whenGET('partials/index-menu.html').respond();
	        $httpBackend.whenPOST('/ws/rest/v1/item/6g65dc56-72ec-4ab5-9fa8-d98be91adb5b').
	        respond({ name: 'item5', 
	            	uuid: '6g65dc56-72ec-4ab5-9fa8-d98be91adb5b'});
	        
	        var updatedItem = angular.toJson({name:'item5',uuid: '6g65dc56-72ec-4ab5-9fa8-d98be91adb5b'})
	        openmrsRest.update('item',{uuid: '6g65dc56-72ec-4ab5-9fa8-d98be91adb5b'}, updatedItem).then(function(resp){
	        	UPDATEitem = resp;
	        });
	        
	        $httpBackend.flush();
    	}));
	    it('should update item4', function(){
	    	expect(UPDATEitem).toEqualData({ name: 'item5', 
	    								uuid: '6g65dc56-72ec-4ab5-9fa8-d98be91adb5b'});	
	    });
	});
    describe('Remove should delete item with given uuid', function(){
    	var $httpBackend, openmrsRest, DELETEitem;

        beforeEach(inject(function(_$httpBackend_, _openmrsRest_){
	    	openmrsRest = _openmrsRest_;
	        $httpBackend = _$httpBackend_;
	        $httpBackend.whenGET('partials/index-menu.html').respond();
	        $httpBackend.whenDELETE('/ws/rest/v1/item/6g65dc56-72ec-4ab5-9fa8-d98be91adb5b').
	        respond({message: 'Item deleted'});
	        
	        openmrsRest.remove('item',{uuid: '6g65dc56-72ec-4ab5-9fa8-d98be91adb5b'}).then(function(resp){
	        	DELETEitem = resp;
	        });
	            
	            $httpBackend.flush();
        }));
	    it('should delete item4', function(){
	    	expect(DELETEitem.message).toEqualData('Item deleted');	
	    });
	});

    
});