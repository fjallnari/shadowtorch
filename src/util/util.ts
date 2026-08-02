import type Theme from '../interfaces/Theme';
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

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

export const cssVarTheme = (theme: Theme) =>
	Object.entries(theme)
		.map(([key, value]) => {
			if (key !== 'id' && key !== 'name' && key !== 'spritePath') {
				return `${key}:${value}`;
			}
		})
		.join(';');

export const hexToRgb = (hex: string): [number, number, number] => {
	const clean = hex.replace('#', '');
	return [
		parseInt(clean.slice(0, 2), 16),
		parseInt(clean.slice(2, 4), 16),
		parseInt(clean.slice(4, 6), 16)
	];
};