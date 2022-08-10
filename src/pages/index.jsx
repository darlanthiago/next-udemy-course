import Head from "next/head";
import styled from "styled-components";

const Heading = styled.h5`
  color: ${({ theme }) => theme.colors.secondary};
`;

const Container = styled.div``;

export default function Home({ repos }) {
  return (
    <>
      <Head>
        <title>darlanthiago repos</title>
      </Head>
      <Container>
        {repos.map((repo) => (
          <Heading key={repo.id}>{repo.full_name}</Heading>
        ))}
      </Container>
    </>
  );
}

export async function getStaticProps(ctx) {
  const response = await fetch(
    "https://api.github.com/users/darlanthiago/repos"
  );
  const data = await response.json();

  return {
    props: {
      repos: data,
    },
  };
}
