
app.directive("strongSecret", function () {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function (scope, element, attr, ctrl) {
			function customValidator(ngModelValue) {
				if (ngModelValue.length == 0) {
					ctrl.$setValidity('required', true);
				}
				else {
					ctrl.$setValidity('required', false);
				}
				if (/^[a-zA-Z0-9-]+$/.test(ngModelValue)) {
					ctrl.$setValidity('normal', true);
				} else {
					ctrl.$setValidity('normal', false);
				}
				if (/[a-zA-Z0-9]+$/.test(ngModelValue)) {
					ctrl.$setValidity('validnormal', true);
				} else {
					ctrl.$setValidity('validnormal', false);
				}
				if (ngModelValue.length >= 3) {
					ctrl.$setValidity('threeCharactersValidator', true);
				} else {
					ctrl.$setValidity('threeCharactersValidator', false);
				}
				return ngModelValue;
			}
			ctrl.$parsers.push(customValidator);
		}
	};

});


app.directive("strongSecret1", function () {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function (scope, element, attr, ctrl) {
			function customValidator(ngModelValue) {
				if (ngModelValue.length >= 3) {
					ctrl.$setValidity('threeCharactersValidator', true);
				} else {
					ctrl.$setValidity('threeCharactersValidator', false);
				}
				return ngModelValue;
			}
			ctrl.$parsers.push(customValidator);
		}
	};

})