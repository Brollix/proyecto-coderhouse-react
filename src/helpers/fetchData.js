import { stock } from '../data/stock';

export const fetchData = () => {
	return new Promise((res) => {
		setTimeout(() => {
			return res(stock);
		}, 500);
	});
};
