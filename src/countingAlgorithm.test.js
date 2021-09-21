const {
	letterCounter,
	costCounter,
	timeCounter,
	deadlineCouter,
} = require("./countingAlgorithm");
let moment = require("../node_modules/moment/min/moment.min");

describe("letterCouter function: ", () => {
	test("should be defined", () => {
		expect(letterCounter).toBeDefined();
	});

	test("should return length of string", () => {
		expect(
			letterCounter(
				`Lorem ipsum dolor sit amet, consectetuer adipiscing elit. 
                    Aenean commodo ligula eget dolor. Aenean massa. Cum sociis
                    natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                    Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla
                    consequat massa quis`
			)
		).toBe(368);
	});
});

describe("costCounter function: ", () => {
	let languages;
	beforeAll(() => {
		languages = [
			{ id: "ua", cost: 0.05, symPerHour: 1333 },
			{ id: "ru", cost: 0.05, symPerHour: 1333 },
			{ id: "en", cost: 0.12, symPerHour: 333 },
		];
	});

	test("should be defined", () => {
		expect(costCounter).toBeDefined();
	});

	test("should produce minCost value", () => {
		expect(costCounter("none", languages[1], 100)).toBe(50);
		expect(costCounter("none", languages[1], 1100)).toBeGreaterThan(
			50
		);
		expect(costCounter("none", languages[2], 100)).toBe(120);
		expect(costCounter("none", languages[2], 1100)).toBeGreaterThan(
			120
		);
	});

	test("shound properly work with files(adding 20% to cost)", () => {
		expect(costCounter("pdf", languages[2], 1100)).toBe(158.4);
		expect(costCounter("docx", languages[2], 1100)).toBe(132.0);
	});
});

describe("timeCounter function", () => {
	let languages;
	beforeAll(() => {
		languages = [
			{ id: "ua", cost: 0.05, symPerHour: 1333 },
			{ id: "ru", cost: 0.05, symPerHour: 1333 },
			{ id: "en", cost: 0.12, symPerHour: 333 },
		];
	});

	test("should be defined", () => {
		expect(timeCounter).toBeDefined();
	});

	test("should include minTime value", () => {
		expect(timeCounter(languages[1], 0)).toBe(1);
	});

	test("should include defTime value", () => {
		expect(timeCounter(languages[1], 1333)).toBe(1.5);
		expect(timeCounter(languages[1], 1334)).toBe(2.5);
	});
});

describe("deadlineCounter function: ", () => {
	let orderDate;
	let startTime;
	let endTime;
	let currDay;
	let finishDay;
	let finishTime;
	const dateFormat = "DD.MM";
	const timeFormat = "HH:mm";

	beforeEach(() => {
		orderDate = moment().locale("ua");
		startTime = moment().startOf("day").add(10, "hours");
		endTime = moment(startTime).add(9, "hours");
	});

	test("should be defined", () => {
		expect(deadlineCouter).toBeDefined();
	});

	test("should include startOfWorkingDay value, and properly work with it", () => {
		currDay = orderDate.hours(10);
		finishDay = currDay.clone().format(dateFormat);
		finishTime = currDay.clone().hours(11).format(timeFormat);
		expect(deadlineCouter(1, currDay, endTime, startTime)).toMatch(
			finishDay + " о " + finishTime
		);
	});
});
