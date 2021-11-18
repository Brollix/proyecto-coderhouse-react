import { stock } from '../data/stock';

export const fetchData = () => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(stock);
		}, 1500);
	});
};
