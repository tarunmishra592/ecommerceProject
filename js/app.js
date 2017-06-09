(function(){

"use strict";

var app = angular.module("shoppingApp", ['ngRoute'])
	
app.config(function($routeProvider, $locationProvider){
	$locationProvider.hashPrefix('');
	$routeProvider
	.when("/", {
		templateUrl:"product-details.html",
		controller:"productDetails"
	})
	.otherwise({
		templateUrl:"product-details.html",
		controller:"productDetails"
	})
});

app.controller("headerController", headerCtrl);
headerCtrl.$inject = ['$scope','productsLists'];
function headerCtrl($scope, productsLists){
	$scope.cartTotal = productsLists.totalPrice;
	$scope.cartProducts = productsLists.allPro;
	$scope.productQuantity = 1;
	$scope.productPlus = function(i){
		$scope.productQuantity = $scope.productQuantity + 1;
	}
	$scope.productMin = function(i){
		if($scope.productQuantity == 1){
			return;
		}
		$scope.productQuantity = $scope.productQuantity -1;
	};
	$scope.removeProduct = function(i){
		$scope.cartProducts.pop(i);
	}
};

app.controller("productDetails", produtInfo);
produtInfo.$inject = ['$scope'];
function produtInfo($scope){
	$scope.products=[
		{
		name:"This is Product Title",
		price:"1200",
		colors:["Orange", "Blue", "Gray", "Yellow"],
		sizes:["S","M","L"],
		sizeWell:["26", "24", "28"],
		quantity:1
		}
	];
	$scope.products =$scope.products[0];
	$scope.colorVal = function(val){
		$scope.colorval = val;
	}
	$scope.sizeVal = function(val){
		$scope.sizeval = val;
	}
	$scope.wsizeVal = function(val){
		$scope.wsizeval = val;
	}
	
};
	
app.directive("toCart", function toCartFun(productsLists, $anchorScroll){
	return{
		restrict:"E",
		template:"<a ng-click='addToCart()'>+</a>",
		scope:{
			proTitle:"@",
			proPrice:"@"
		},
		link: function(scope, element, attrs){
			scope.addToCart = function(){
				scope.selectedColor = scope.$parent.colorval;
				scope.selectedSize = scope.$parent.sizeval;
				scope.selectedWsize = scope.$parent.wsizeval;
				
				if(scope.selectedColor==undefined){
					alert("Please Select Color");
					 $("body").animate({scrollTop: element.offset().top}, "slow");
					return;
				}else if(scope.selectedSize==undefined){
					alert("Please Select Size");
					$("body").animate({scrollTop: element.offset().top}, "slow");
					return;
				}else{
					productsLists.allPro.push({name:scope.proTitle,color:scope.selectedColor,size:scope.selectedSize,price:scope.proPrice});
					productsLists.totalPrice = (productsLists.totalPrice-0) + (scope.proPrice-0);
				}
			}
		}
	}
})
	
app.service("productsLists", function(){
	this.allPro = [];
	this.totalPrice = 0;
})

})();