import type dayjs from 'dayjs';

export default interface TorchInterface {
	id: string;
	name: string;
	timeLeft: number;
	endTime?: dayjs.Dayjs;
	intervalID?: number;
	isLit: boolean;
}
