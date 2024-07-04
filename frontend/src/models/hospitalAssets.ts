// src/app/models/assets/hospital-asset.ts
export interface HospitalAsset {
	id: number;
	batteryLevel: number;
	tagId: string;
	name: string;
	description: string;
	floor: number;
	lat?: number;
	lon?: number;
}
