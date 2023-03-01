export const getYearsFromToNow = (startYear: number): number[] => {
	const currentYear = new Date().getFullYear();
	const years = [];
	startYear = startYear || 1950;
	while (startYear <= currentYear) {
		years.push(startYear++);
	}
	return years.reverse();
};
