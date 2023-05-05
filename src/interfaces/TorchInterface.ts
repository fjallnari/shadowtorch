export default interface TorchInterface {
	id: string;
	name: string;
	timeLeft: number;
	intervalID?: NodeJS.Timer;
	isLit: boolean;
}
