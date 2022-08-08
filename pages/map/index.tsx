import { LatLngExpression } from "leaflet";
import dynamic from "next/dynamic";

type user = {
	image: string;
	name: string;
	position: LatLngExpression;
};

const me: user = {
	image: "https://res.cloudinary.com/cake-shop/image/upload/v1659192823/avatar_pjgqwm.jpg",
	name: "I'm here",
	position: [10.879713390827446, 106.80814820008143],
};

const friends: user[] = [
	{
		image: "https://res.cloudinary.com/cake-shop/image/upload/v1659235088/avatar1_h6a1gw.jpg",
		name: "Võ Xuân Tú",
		position: [10.877607, 106.807177],
	},
	{
		image: "https://res.cloudinary.com/cake-shop/image/upload/v1659235088/avatar3_qq8unc.jpg",
		name: "Võ Minh Tuấn",
		position: [10.881493663474352, 106.80881372800826],
	},
	{
		image: "https://res.cloudinary.com/cake-shop/image/upload/v1659235088/avatar2_iv1ljk.jpg",
		name: "Nguyễn Văn An",
		position: [10.879102, 106.808803],
	},
	{
		image: "https://res.cloudinary.com/cake-shop/image/upload/v1659235088/avatar4_ykkgev.jpg",
		name: "Nguyễn Văn Bình",
		position: [10.878354244812856, 106.80630284027266],
	},
];

const MyMap = dynamic(() => import("../../components/map/Map"), { ssr: false });

const mapIndex = () => {
	return <MyMap me={me} friends={friends} />;
};

export default mapIndex;
