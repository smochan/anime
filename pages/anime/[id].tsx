import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import axios from "axios";
import styles from "../../styles/Details.module.css";
import { FilmResponse } from "../../interfaces";

interface Props {
  data: FilmResponse;
}

const Details: NextPage<Props> = ({ data }) => {
  return (
    <>
      <Head>
        <title>{data.title}</title>
        <meta name="description" content={data.description} />
      </Head>

      <main className={styles.main}>
        <div
          className={styles.header}
          style={{ backgroundImage: `url(${data.movie_banner})` }}
        >
          <div className={styles.title}>
            <h1>{data.title}</h1>
            <h3>
              {data.original_title_romanised} | {data.original_title}
            </h3>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.details}>
            <p>{data.description}</p>
          </div>

          <div className={styles.image}>
            <Image
              src={data.image}
              alt={data.title}
              height={384}
              width={256}
              layout="intrinsic"
            />
            <div className={styles.creator}>
              <p>
                <strong>Directed by: </strong> {data.director}
              </p>
              <p>
                <strong>Produced by: </strong> {data.producer}
              </p>
              <p>
                <strong>Released on: </strong> {data.release_date}
              </p>
            </div>
          </div>
        </div>

        {/* <div style={{ height: "200vh" }} /> */}
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const res = await axios.get<FilmResponse>(
    `https://ghibliapi.herokuapp.com/films/${id}`
  );
  return {
    props: {
      data: res.data,
    },
  };
};

export default Details;
