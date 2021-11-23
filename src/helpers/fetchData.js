import { stock } from '../data/stock';

export const fetchData = () => {
	return new Promise((resolve) => {
		resolve(stock);
	});
};
