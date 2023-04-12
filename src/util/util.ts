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

export const secondsToMinutes = (seconds: number) => Math.floor(seconds / 60);
export const padWithZeroes = (number: number) => number.toString().padStart(2, '0');

export const prettyTime = (timeInSeconds: number) => {
	const minutes = secondsToMinutes(timeInSeconds);
	const remainingSeconds = timeInSeconds % 60;
	return `${padWithZeroes(minutes)}:${padWithZeroes(remainingSeconds)}`;
};
