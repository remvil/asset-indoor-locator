// Devices API Responses
export type ExtAPIResponse = {
	code: number;
	msg: string;
	data: any;
};

// User data Object
export type UserObject = {
	id?: number;
	name?: string;
	token: string;
};
