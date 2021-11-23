import { stock } from '../data/stock';

export const fetchData = async () => {
	fetch(stock);
};
