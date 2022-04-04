import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import axios from "axios";
import styles from "../styles/Home.module.css";
import Link from "next/link";

const Home: NextPage = () => {
  const [animes, setAnime] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const getAnime = async () => {
        setLoading(true);
        const response = await axios.get(
          "https://ghibliapi.herokuapp.com/films"
        );
        setAnime(response.data);
        setLoading(false);
      };
      getAnime();
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>Anime</title>
        <meta name="description" content="Get information about animes" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Animes</h1>
        {loading && <h3>Loading...</h3>}
        {animes?.length > 0 && (
          <div className={styles.grid}>
            {animes.map((anime) => (
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
        )}
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Home;
