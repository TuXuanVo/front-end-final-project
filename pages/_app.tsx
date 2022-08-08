import "../styles/globals.css";
import type { AppProps } from "next/app";
import UserProvider from "../context/userContext";
import { CookiesProvider } from "react-cookie";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<CookiesProvider>
			<UserProvider>
				<Component {...pageProps} />
			</UserProvider>
		</CookiesProvider>
	);
}

export default MyApp;
