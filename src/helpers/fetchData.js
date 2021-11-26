import { stock } from '../data/stock';

export const fetchData = () => {
	return new Promise((res, rej) => {
		setTimeout(() => {
			return res(stock);
		}, 1500);
	});
};
