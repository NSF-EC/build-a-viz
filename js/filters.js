'use strict';

/* Filters */
define(['angular'], function(angular) {

angular.module('raw.filters', [])

	.filter('categoryFilter', [function () {
	    return function (charts, category) {
            return charts.filter(function (chart){
            	return !chart.category() && category == 'Others' || chart.category() == category;
            });
	    };
	}]);

});
