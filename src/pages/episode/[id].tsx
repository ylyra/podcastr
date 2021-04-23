import { useContext } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

import { api } from "../../services/api";
import { convertDurationToTimeString } from "../../utils/convertDurationToTimeString";
import { PlayerContext } from "../../contexts/PlayerContext";

import styles from "../../styles/episode.module.scss";

type Episode = {
  id: string;
  title: string;
  description: string;
  members: string;
  published_at: string;
  publishedAt: string;
  thumbnail: string;
  duration: number;
  durationAsString: string;
  url: string;
};

type EpisodeProps = {
  episode: Episode;
};

export default function Episode({ episode }: EpisodeProps) {
  const {
    episodeList,
    currentEpisodeIndex,
    play,
    togglePlay,
    isPlaying,
  } = useContext(PlayerContext);

  const currentEpisode = episodeList[currentEpisodeIndex];

  return (
    <div className={styles.episodePage}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="description" content={episode.title} />
        <link
          rel="canonical"
          href={`https://podcastr.yanlyra.com.br/episode/${episode.id}`}
        />
        <meta
          property="og:url"
          content={`https://podcastr.yanlyra.com.br/episode/${episode.id}`}
        />
        <meta property="og:title" content={`Podcastr - ${episode.title}`} />
        <meta property="og:description" content={episode.title} />
        <meta property="og:image" content={episode.thumbnail} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="600" />
        <meta property="og:type" content="article" />
        <meta
          property="article:published_time"
          content={episode.published_at}
        />
        <meta property="article:author" content={episode.members} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Podcastr - ${episode.title}`} />
        <meta name="twitter:description" content={episode.title} />
        <meta name="twitter:image" content={episode.thumbnail} />

        <meta name="rating" content="general" />
        <meta property="og:site_name" content={`Podcastr - ${episode.title}`} />
        <meta property="og:locale" content="pt_BR" />

        <title>Podcastr - {episode.title}</title>
      </Head>

      <div className={styles.episode}>
        <div className={styles.thumbnailContainer}>
          <Link href="/">
            <button type="button">
              <img src="/arrow-left.svg" alt="Voltar" />
            </button>
          </Link>

          <Image
            width={700}
            height={160}
            src={episode.thumbnail}
            objectFit="cover"
          />

          {currentEpisode && currentEpisode.id == episode.id && isPlaying ? (
            <button
              type="button"
              onClick={togglePlay}
              className={`${styles.currentPlaying} ${styles.pause}`}
            >
              <img src="/pause.svg" alt="Tocar episódio" />
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
                <button type="button" onClick={() => play(episode)}>
                  <img src="/play.svg" alt="Tocar episódio" />
                </button>
              )}
            </>
          )}
        </div>

        <header>
          <h1>{episode.title}</h1>
          <span>{episode.members}</span>
          <span>{episode.publishedAt}</span>
          <span>{episode.durationAsString}</span>
        </header>

        <div
          className={styles.description}
          dangerouslySetInnerHTML={{ __html: episode.description }}
        />
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params;

  const { data } = await api.get(`episodes/${id}`);

  const episode = {
    id: data.id,
    title: data.title,
    thumbnail: data.thumbnail,
    members: data.members,
    published_at: data.published_at,
    publishedAt: format(parseISO(data.published_at), "d MMM yy", {
      locale: ptBR,
    }),
    description: data.description,
    duration: Number(data.file.duration),
    durationAsString: convertDurationToTimeString(Number(data.file.duration)),
    url: data.file.url,
  };

  return {
    props: { episode },
    revalidate: 86400, // 24 hours
  };
};
