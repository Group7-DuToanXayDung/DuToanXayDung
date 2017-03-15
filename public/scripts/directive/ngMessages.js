function valid(name) {
	app.directive(name, function () {
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function (scope, element, attr, ctrl) {
				function customValidator(ngModelValue) {
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

	})
};
valid("strongSecret");
