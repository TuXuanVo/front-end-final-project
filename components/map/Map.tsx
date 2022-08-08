import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from "leaflet";
import styles from "./Map.module.css";

type user = {
	image: string;
	name: string;
	position: LatLngExpression;
};

type Props = {
	me: user;
	friends: user[];
};

function getIconMarkerFriends(imageUrl: string) {
	return L.icon({
		iconUrl: imageUrl,
		iconSize: [50, 50],
		className: styles.iconMarkerFriends,
	});
}

function getIconMarkerMe(imageUrl: string) {
	return L.icon({
		iconUrl: imageUrl,
		iconSize: [50, 50],
		className: styles.iconMarkerMe,
	});
}

const Map: React.FC<Props> = ({ me, friends }) => {
	return (
		<MapContainer center={me.position} zoom={13} scrollWheelZoom={true} className={styles.container}>
			<TileLayer
				attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<Marker position={me.position} icon={getIconMarkerMe(me.image)}>
				<Popup>{me.name}</Popup>
			</Marker>

			{friends.map((friend) => (
				<Marker key={me.name} position={friend.position} icon={getIconMarkerFriends(friend.image)}>
					<Popup>{friend.name}</Popup>
				</Marker>
			))}
		</MapContainer>
	);
};

export default Map;
