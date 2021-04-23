import { AnimateSharedLayout } from "framer-motion";

import { Header } from "../components/Header";
import { Player } from "../components/Player";
import { PlayerProvider } from "../contexts/PlayerContext";

import "../styles/global.scss";

import styles from "../styles/app.module.scss";

function Podcastr({ Component, pageProps }) {
  return (
    <AnimateSharedLayout>
      <PlayerProvider>
        <div className={styles.wrapper}>
          <main>
            <Header />
            <Component {...pageProps} />
          </main>

          <Player />
        </div>
      </PlayerProvider>
    </AnimateSharedLayout>
  );
}

export default Podcastr;
