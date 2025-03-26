export default interface TorchInterface {
	id: string;
	name: string;
	timeLeft: number;
	intervalID?: NodeJS.Timeout;
	isLit: boolean;
}
