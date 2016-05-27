var findApplicants = function(opp, callback) {
	var list = [];
	for (var i = 0; i < opp.applications.length; i++) {
		list.push(opp.applications[i].applicant.toHexString());
	};
	return callback(list);
}

module.exports = {findApplicants: findApplicants};