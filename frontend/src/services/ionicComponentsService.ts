import {toastController} from "@ionic/vue";
import {checkmarkCircleSharp, warningSharp, thumbsDownSharp} from "ionicons/icons";

export async function presentToast(
	position: "top" | "middle" | "bottom",
	msg: string,
	level: "success" | "warning" | "danger" | undefined = undefined
) {
	switch (level) {
		case "success":
			return toastController
				.create({message: msg, duration: 1500, position, icon: checkmarkCircleSharp, color: "success"})
				.then((toast) => toast.present());
		case "warning":
			return toastController.create({message: msg, duration: 1500, position, icon: warningSharp, color: "warning"}).then((toast) => toast.present());
		case "danger":
			return toastController
				.create({message: msg, duration: 1500, position, icon: thumbsDownSharp, color: "danger"})
				.then((toast) => toast.present());
		default:
			return toastController.create({message: msg, duration: 1500, position, color: "primary"}).then((toast) => toast.present());
	}
}
