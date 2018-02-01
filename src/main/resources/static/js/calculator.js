function Calculator(t) {
	if (t === 'jy' || t === '129' || t === '159' || t === '189') {
		this.mode = t
	} else {
		this.mode = 'normal'
	}
};
Calculator.prototype.M = 3;
Calculator.prototype.NORMAL = 'normal';
Calculator.prototype.JY = 'jy';
Calculator.prototype.JY_129 = '129';
Calculator.prototype.JY_159 = '159';
Calculator.prototype.JY_189 = '189';
Calculator.prototype.INTEREST_RATE_DICT = {
	12: 0.31,
	24: 0.31,
	36: 0.31,
	48: 0.31
};
Calculator.prototype.M_FEE_RATE_129_DICT = {
	12: 0.00062,
	24: 0.00359,
	36: 0.00421,
	48: 0.00446
};
Calculator.prototype.M_FEE_RATE_189_DICT = {
	12: 0.008,
	24: 0.009,
	36: 0.009,
	48: 0.0095
};
Calculator.prototype.PRE_FEE_RATE_78_DICT = {
//	12: 0.0353,
//	24: 0.0578,
//	36: 0.0664,
//	48: 0.0718
	12: 0.0031,
	24: 0.0031,
	36: 0.0031,
	48: 0.0031
};
Calculator.prototype.PRE_FEE_RATE_129_DICT = {
	12: 0.08,
	24: 0.08,
	36: 0.08,
	48: 0.08
};
Calculator.prototype.PRE_FEE_RATE_189_DICT = {
	12: 0.06,
	24: 0.08,
	36: 0.09,
	48: 0.09
};
Calculator.prototype.ADVANCE_REPAYMENT_RATE_78_DICT = {
	12: 0.030,
	24: 0.035,
	36: 0.035,
	48: 0.035
};
Calculator.prototype.ADVANCE_REPAYMENT_RATE_129_DICT = {
	12: 0.045,
	24: 0.040,
	36: 0.040,
	48: 0.040
};
Calculator.prototype.ADVANCE_REPAYMENT_RATE_189_DICT = {
	12: 0.06,
	24: 0.08,
	36: 0.09,
	48: 0.09
};
Calculator.prototype.M_FEE_RATE_129_LINE_DICT = {
	12: 0,
	24: 0,
	36: 0,
	48: 0
};
Calculator.prototype.M_FEE_RATE_189_LINE_DICT = {
	12: 0,
	24: 0,
	36: 0,
	48: 0
};
Calculator.prototype.PRE_FEE_RATE_78_LINE_DICT = {
	12: 0.0353,
	24: 0.0578,
	36: 0.0664,
	48: 0.0718
};
Calculator.prototype.PRE_FEE_RATE_129_LINE_DICT = {
	12: 0.08,
	24: 0.08,
	36: 0.08,
	48: 0.08
};
Calculator.prototype.PRE_FEE_RATE_189_LINE_DICT = {
	12: 0.14,
	24: 0.23,
	36: 0.288,
	48: 0.3318
};
Calculator.prototype.ADVANCE_REPAYMENT_RATE_78_LINE_DICT = {
	12: 0.030,
	24: 0.035,
	36: 0.035,
	48: 0.035
};
Calculator.prototype.ADVANCE_REPAYMENT_RATE_129_LINE_DICT = {
	12: 0.045,
	24: 0.040,
	36: 0.040,
	48: 0.040
};
Calculator.prototype.ADVANCE_REPAYMENT_RATE_189_LINE_DICT = {
	12: 0.060,
	24: 0.050,
	36: 0.045,
	48: 0.040
};
Calculator.prototype.calculate = function(t, e, a, p) {
	if (!/^\d+$/.test(t)) {
		throw 'principal value error!'
	};
	if ((!/^\d+$/.test(e)) || e < 1 || e > 48) {
		throw 'period value error!'
	};
	if (a == null || a == '') {
		a = Calculator.prototype.INTEREST_RATE_DICT[
		e]
	};
	if (a > 0.2 || a < 0.1) {
		throw 'interest rate value error!'
	};
	var l = this._getPreFeeRate(e, p),
		o = give(t / (1 - l)),
		n = a / 12,
		E = this._monthPay(o, e, n),
		i = E * e,
		c = i - o,
		u = parseInt(o) - parseInt(t),
		r = {
			principal: t,
			period: e,
			rate: a,
			mrate: n,
			total: i,
			interest: round(c),
			mode: this.mode,
			month_pay: E,
			contractAmount: o,
			preFee: u,
			preFeeRate: l
		};
	r = this._genfare(r, p);
	return this._genPlan(r)
};
Calculator.prototype._monthPay = function(t, e, a) {
	var o = Math.pow(a + 1, e),
		r = t * o * a,
		p = o - 1,
		l = r / p;
	return l
};
Calculator.prototype._genfare = function(t, e) {
	switch (t.mode) {
	case this.JY:
		t.platformRate = 0;
		if (e == 'online') {
			t.advanceRepayRate = Calculator.prototype.ADVANCE_REPAYMENT_RATE_78_DICT[
			t.period]
		} else if (e == 'line') {
			t.advanceRepayRate = Calculator.prototype.ADVANCE_REPAYMENT_RATE_78_LINE_DICT[
			t.period]
		};
		t.mfare = t.platformRate * t.contractAmount;
		t.month_pay_total = round(t.month_pay + t.mfare).toFixed(2);
		t.loan = t.principal;
		t.fare = t.mfare * t.period + t.preFee;
		t.balance = round(t.total + t.fare - t.preFee);
		t.totalFee = round(t.preFee + t.interest + t.mfare * t.period);
		break;
	case this.JY_129:
		if (e == 'online') {
			t.platformRate = Calculator.prototype.M_FEE_RATE_129_DICT[
			t.period];
			t.advanceRepayRate = Calculator.prototype.ADVANCE_REPAYMENT_RATE_129_DICT[
			t.period]
		} else if (e == 'line') {
			t.platformRate = Calculator.prototype.M_FEE_RATE_129_LINE_DICT[
			t.period];
			t.advanceRepayRate = Calculator.prototype.ADVANCE_REPAYMENT_RATE_129_LINE_DICT[
			t.period]
		};
		t.mfare = round(t.platformRate * t.contractAmount);
		t.month_pay_total = round(t.month_pay + t.mfare).toFixed(2);
		t.loan = t.principal;
		t.fare = t.mfare * t.period + t.preFee;
		t.balance = round((t.total + t.fare - t.preFee));
		t.totalFee = round(t.preFee + t.interest + t.mfare * t.period);
		break;
	case this.JY_189:
		if (e == 'online') {
			t.platformRate = Calculator.prototype.M_FEE_RATE_189_DICT[
			t.period];
			t.advanceRepayRate = Calculator.prototype.ADVANCE_REPAYMENT_RATE_189_DICT[
			t.period]
		} else if (e == 'line') {
			t.platformRate = Calculator.prototype.M_FEE_RATE_189_LINE_DICT[
			t.period];
			t.advanceRepayRate = Calculator.prototype.ADVANCE_REPAYMENT_RATE_189_LINE_DICT[
			t.period]
		};
		t.mfare = t.platformRate * t.contractAmount;
		t.month_pay_total = round(t.month_pay + t.mfare).toFixed(2);
		t.loan = t.principal;
		t.fare = t.mfare * t.period + t.preFee;
		t.balance = round(t.total + t.fare - t.preFee);
		t.totalFee = round(t.preFee + t.interest + t.mfare * t.period);
		break;
	case this.NORMAL:
	default:
		t.month_pay = this._monthPay(t.principal, t.period, t.mrate);
		t.total = t.month_pay * t.period;
		t.fare = ((t.period) > 2 ? (t.principal) * (0.04 + ((t.period) - 2) * 0.002) : (t.principal) * 0.04);
		t.mfare = 0;
		t.loan = t.principal - t.fare;
		t.balance = round(t.total);
		t.interest = round(t.total - t.principal);
		t.contractAmount = t.principal
	};
	t.total = round(t.total + t.fare);
	t.fare = round(t.fare);
	return t
};
Calculator.prototype._genPlan = function(t) {
	var l = [],
		p = t.contractAmount,
		n = t.interest;
	for (var a = 1; a <= t.period; a++) {
		var e = {};
		e.index = a;
		e.fare = t.mfare;
		if (a == t.period) {
			e.total = round((t.balance - (t.month_pay + t.mfare) * (t.period - 1)));
			e.interest = round(n);
			e.principal = round(p);
			e.balance = 0;
			p = 0;
			n = 0
		} else {
			e.total = round((t.month_pay + e.fare));
			e.interest = round(p * t.mrate);
			e.principal = round(t.month_pay - e.interest);
			e.balance = round((t.balance - (e.fare + t.month_pay) * a));
			p -= e.principal;
			n -= e.interest
		};
		var o, r;
		if (a <= Calculator.prototype.M) {
			o = t.preFee - (t.contractAmount * t.advanceRepayRate);
			r = t.contractAmount * (t.preFeeRate - t.advanceRepayRate)
		} else {
			o = (t.preFee - (t.contractAmount * t.advanceRepayRate)) * (1 - (a - 3) / (t.period - 3));
			r = t.contractAmount * (t.preFeeRate - t.advanceRepayRate) * (1 - (a - 3) / (t.period - 3))
		};
		o = Math.abs(o);
		r = Math.abs(r);
		e.a = o;
		e.b = r;
		if (o > r) {
			e.advanceRepayM = round(r)
		} else {
			e.advanceRepayM = round(o)
		};
		e.p_balance = p;
		e.advanceRepayAMT = round(t.month_pay_total + p - e.advanceRepayM + p * 0.005);
		l.push(e)
	};
	t.pay_unit = l;
	t.month_pay = l[
	0].total;
	return t
};
Calculator.prototype._getPreFeeRate = function(t, e) {
	var a;
	switch (this.mode) {
	case this.JY:
		if (e == 'online') {
			a = Calculator.prototype.PRE_FEE_RATE_78_DICT[
			t]
		} else if (e == 'line') {
			a = Calculator.prototype.PRE_FEE_RATE_78_LINE_DICT[
			t]
		};
		break;
	case this.JY_129:
		if (e == 'online') {
			a = Calculator.prototype.PRE_FEE_RATE_129_DICT[
			t]
		} else if (e == 'line') {
			a = Calculator.prototype.PRE_FEE_RATE_129_LINE_DICT[
			t]
		};
		break;
	case this.JY_189:
		if (e == 'online') {
			a = Calculator.prototype.PRE_FEE_RATE_189_DICT[
			t]
		} else if (e == 'line') {
			a = Calculator.prototype.PRE_FEE_RATE_189_LINE_DICT[
			t]
		};
		break;
	case this.NORMAL:
	default:
		a = 0
	};
	return a
};

function give(t) {
	return parseInt(t / 100) * 100
};

function round(t) {
	return Math.round(t * 100) / 100
};