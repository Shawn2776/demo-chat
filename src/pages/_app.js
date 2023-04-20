import "@/styles/globals.css";
import { Oswald } from "next/font/google";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

export default function App({ Component, pageProps }) {
  return (
    <div className={oswald.className}>
      <Component {...pageProps} />
    </div>
  );
}
