import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import axios from "axios";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { FilmResponse } from "../interfaces";


interface Props {
  data: [FilmResponse];
}

const Home: NextPage<Props> = ({ data }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Anime</title>
        <meta name="description" content="Get information about animes" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Animes</h1>
          <div className={styles.grid}>
            {data.map((anime) => (
              <Link href={`/anime/${anime.id}`} key={anime?.id}>
                <a className={styles.card}>
                  <Image
                    src={anime?.image}
                    alt={anime?.title}
                    width={200}
                    height={300}
                  />
                  <h3>{anime?.title}</h3>
                </a>
              </Link>
            ))}
          </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}/films/`
  );
  return {
    props: {
      data: res.data.data.films,
    },
  };
};

export default Home;
