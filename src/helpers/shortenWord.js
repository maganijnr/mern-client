export const shortenWord = (str, n) => {
	return str.length >= n ? str.slice(0, n) + "..." : str;
};
