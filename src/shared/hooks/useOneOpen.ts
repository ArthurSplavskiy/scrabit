import { useState } from 'react';

export const useOneOpen = (data: any[] | undefined) => {
	const [newData, setNewData] = useState(
		data?.map((item, index) => ({
			...item,
			id: index,
			open: false
		}))
	);

	const toggle = (id: number) => {
		setNewData(
			newData?.map((item) => {
				if (item.id === id) return { ...item, open: !item.open };

				return { ...item, open: false };
			})
		);
	};

	return {
		newData,
		setNewData,
		toggle
	};
};
