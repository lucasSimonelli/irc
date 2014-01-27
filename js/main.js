var irc = {};

irc.selectors = {
	baseAmmountInput: '#base-ammount',
	baseAmmountError: '#base-ammount-error',
	annualInterestRateInput: '#annual-rate',
	annualInterestRateError: '#annual-rate-error',
	numberOfMonthsInput: '#months',
	numberOfMonthsError: '#months-error',
	actionButton: '#show-money-button',
	resultContainer: '#result'
};

irc.elements = {};

$(document).ready(function() {
	function captureElements() {
		_.each(_.keys(irc.selectors), function(selector) {
			irc.elements[selector] = $(irc.selectors[selector]);
		});
	}
	captureElements();

	function getFinalAmmount(base, rate, months) {
		var accum = base;
		var monthlyRate = rate/100;
		monthlyRate = monthlyRate/12;
		for(var i = 0; i<months; i++) {
			accum += accum*monthlyRate;
		}
		return accum;
	}

	irc.elements.actionButton.click(function() {
		var baseAmmount = parseFloat(irc.elements.baseAmmountInput.val());
		var annualInterestRate = parseFloat(irc.elements.annualInterestRateInput.val());
		var months = parseInt(irc.elements.numberOfMonthsInput.val());

		var valid = true;
		if(_.isNaN(baseAmmount)) {
			irc.elements.baseAmmountError.text('Required');
			valid = false;
		}
		if(_.isNaN(annualInterestRate)) {
			irc.elements.annualInterestRateError.text('Required');
			valid = false;	
		}
		if(_.isNaN(months)) {
			irc.elements.numberOfMonthsError.text('Required');
			valid = false;
		}

		if(valid) {
			irc.elements.baseAmmountError.text('');
			irc.elements.annualInterestRateError.text('');
			irc.elements.numberOfMonthsError.text('');
			var result = getFinalAmmount(baseAmmount, annualInterestRate, months);
			irc.elements.resultContainer.text(result.toFixed(2));			
		}

	});

	$(document).keypress(function(evt) {
		if(evt.keyCode === 13) {
			irc.elements.actionButton.click();
		}
	});

});