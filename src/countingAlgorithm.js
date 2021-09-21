const moment = require('../node_modules/moment/min/moment.min')

// const dateFormat = 'DD.MM';
// const timeFormat = 'HH:mm';

const services = [
	{ id: "translation", name: "Переклад" },
	{ id: "editing", name: "Редагування"  }
];
const languages = [
	{ id: "ua", cost: 0.05, symPerHour: 1333, name: "Українська" },
	{ id: "ru", cost: 0.05, symPerHour: 1333, name: "Російська"  },
	{ id: "en", cost: 0.12, symPerHour: 333, name: "Англійська"  }
];
const letterCounter = (string) => string.length;


function costCounter(
	docType,
	language,
	symbols
) {
	const docTypes = ["none", "doc", "docx", "rtf"];
	let cost = 0;
	if (language !== undefined) {
		let minCost = language.cost * 1000;
		if (docTypes.every((el) => el !== docType)) {
			cost += (language.cost * symbols * (1 + 20 / 100)).toFixed(2);
		} else {
			cost += (language.cost * symbols).toFixed(2);
		}

		if (cost <= minCost) {
			cost = minCost;
			return Number(cost.toString());
		} else {
			return Number(cost.toString().slice(1));
		}
	} else {
		return cost;
	}
};


function timeCounter(language, symbols) {
	if (language !== undefined) {
		const minTime = 1;
		const defTime = 0.5;
		let time = defTime;

		for (let i = symbols; i > 0; i -= language.symPerHour) {
			time += 1;
		}
		if (time <= minTime) {
			time = minTime;
		}
		return time;
	} else {
		return 0;
	}
}

// let workingTime = timeCounter(languages[1], letterCounter(string));

// deadlineCouter(
// 	workingTime,
// 	orderDate,
// 	endTime,
// 	startTime
// );

function deadlineCouter(
	workingHours
) {
	if (workingHours > 0) {
		let orderDate = moment().locale("ua");
		let startTime = moment().startOf("day").add(10, "hours");
		let endTime = moment(startTime).add(9, "hours");
		const dateFormat = "DD.MM";
		const timeFormat = "HH:mm";
		let completionDate = orderDate;

		for (let i = 0; i < workingHours; i++) {
			while (completionDate.day() === 6 || completionDate.day() === 0) {
				completionDate.add(1, "day");
				completionDate.hours(10).minutes(0);
			}
			if (completionDate.hours() < startTime.hours()) {
				completionDate.hours(10).minutes(0);
			}
			if (completionDate.hours() > endTime.hours() - 1) {
				completionDate.add(1, "days");
				completionDate.hours(10).minutes(0);
			}
			completionDate.add(1, "hours");
		}
		return (
			completionDate.format(dateFormat) + " о " + completionDate.format(timeFormat)
		);
	} else {
		return '';
	}
}

module.exports = {
	languages,
	services,
	letterCounter,
	costCounter,
	timeCounter,
	deadlineCouter,
};