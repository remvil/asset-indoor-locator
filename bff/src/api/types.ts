export type ErrorPayload = {
	status: number;
	error: {message: string; code: string};
};

export type ErrorType = any;

export type Feature = {
	type: string;
	properties: {
		id: string;
		[key: string]: any;
	};
	geometry: {
		type: string;
		coordinates: number[];
	};
};

export type FeatureCollection = {
	type: string;
	name: string;
	crs: {
		type: string;
		properties: {
			name: string;
		};
	};
	features: Feature[];
};
