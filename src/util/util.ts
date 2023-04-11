export const randomColor = () => {
	return (
		'#' +
		'000000'.replace(/0/g, function () {
			return (~~(Math.random() * 16)).toString(16);
		})
	);
};

export const isTextNonEmpty = (text: string) => {
	return text && typeof text === 'string' && text.trim() !== '';
};

export const getDefaultIfEmpty = (text: string, defaultStr: string = '0') => {
	return isTextNonEmpty(text) ? text : defaultStr;
};
