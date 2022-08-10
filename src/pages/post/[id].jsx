import React from "react";
import { useRouter } from "next/router";

export default function RepoView({ data }) {
  const router = useRouter();
  return (
    <>
      <button onClick={() => router.back()}>Voltar</button>
      <div>{JSON.stringify(data)}</div>
    </>
  );
}

export const getStaticPaths = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();

  const paths = data.map((post) => {
    return {
      params: {
        id: String(post.id),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`
  );

  const data = await response.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data,
    },
  };
};
