import { useContext } from "react";
import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { motion } from "framer-motion";

import { api } from "../services/api";
import { convertDurationToTimeString } from "../utils/convertDurationToTimeString";
import { PlayerContext } from "../contexts/PlayerContext";

import styles from "../styles/home.module.scss";

type Episode = {
  id: string;
  title: string;
  members: string;
  publishedAt: string;
  thumbnail: string;
  duration: number;
  durationAsString: string;
  url: string;
};

type HomeProps = {
  latestEpisodes: Episode[];
  allEpisodes: Episode[];
};

export default function Home({ latestEpisodes, allEpisodes }: HomeProps) {
  const {
    episodeList,
    currentEpisodeIndex,
    playList,
    togglePlay,
    isPlaying,
  } = useContext(PlayerContext);

  const currentEpisode = episodeList[currentEpisodeIndex];
  const episodes = [...latestEpisodes, ...allEpisodes];

  return (
    <div className={styles.homePage}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>Podcastr - Início</title>
      </Head>

      <section className={styles.latestEpisodes}>
        <h2>Últimos lançamentos</h2>

        <ul>
          {latestEpisodes.map((episode, index) => (
            <li key={episode.id}>
              <motion.img
                src={episode.thumbnail}
                alt={episode.title}
                className={styles.objectFitCover}
                layoutId={episode.id}
              />

              <div className={styles.episodeDetails}>
                <Link href={`/episode/${episode.id}`}>
                  <a>{episode.title}</a>
                </Link>
                <p>{episode.members}</p>
                <span>{episode.publishedAt}</span>
                <span>{episode.durationAsString}</span>
              </div>

              {currentEpisode &&
              currentEpisode.id == episode.id &&
              isPlaying ? (
                <button
                  type="button"
                  className={styles.pauseButton}
                  onClick={togglePlay}
                >
                  <img src="/pause-red.svg" alt="Tocar episódio" />
                </button>
              ) : (
                <>
                  {currentEpisode &&
                  currentEpisode.id == episode.id &&
                  !isPlaying ? (
                    <button
                      type="button"
                      className={styles.currentPlaying}
                      onClick={togglePlay}
                    >
                      <img src="/play-green.svg" alt="Tocar episódio" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => playList(episodes, index)}
                    >
                      <img src="/play-green.svg" alt="Tocar episódio" />
                    </button>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.allEpisodes}>
        <h2>Todos episódios</h2>

        <table cellSpacing={0}>
          <thead>
            <tr>
              <th></th>
              <th>Podcast</th>
              <th>Integrantes</th>
              <th>Data</th>
              <th>Duração</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {allEpisodes.map((episode, index) => (
              <tr key={episode.id}>
                <td width={76}>
                  <motion.img
                    src={episode.thumbnail}
                    alt={episode.title}
                    className={styles.objectFitCover}
                    layoutId={episode.id}
                  />
                </td>
                <td>
                  <Link href={`/episode/${episode.id}`}>
                    <a title={episode.title}>{episode.title}</a>
                  </Link>
                </td>
                <td>{episode.members}</td>
                <td width={100}>{episode.publishedAt}</td>
                <td>{episode.durationAsString}</td>
                <td>
                  {currentEpisode &&
                  currentEpisode.id == episode.id &&
                  isPlaying ? (
                    <button
                      type="button"
                      className={styles.pauseButton}
                      onClick={togglePlay}
                    >
                      <img src="/pause-red.svg" alt="Tocar episódio" />
                    </button>
                  ) : (
                    <>
                      {currentEpisode &&
                      currentEpisode.id == episode.id &&
                      !isPlaying ? (
                        <button
                          type="button"
                          className={styles.currentPlaying}
                          onClick={togglePlay}
                        >
                          <img src="/play-green.svg" alt="Tocar episódio" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            playList(episodes, index + latestEpisodes.length)
                          }
                        >
                          <img src="/play-green.svg" alt="Tocar episódio" />
                        </button>
                      )}
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get("episodes", {
    params: {
      _limit: 12,
      _sort: "published_at",
      _order: "desc",
    },
  });

  const episodes = data.map((episode) => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), "d MMM yy", {
        locale: ptBR,
      }),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(
        Number(episode.file.duration)
      ),
      url: episode.file.url,
    };
  });

  const latestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.length);

  return {
    props: {
      latestEpisodes,
      allEpisodes,
    },
    revalidate: 28800,
  };
};
