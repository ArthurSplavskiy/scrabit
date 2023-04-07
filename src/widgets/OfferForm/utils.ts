export const setSelectedOrNull = (v: string) =>
	v
		? {
				label: v,
				value: v
		  }
		: null;
