import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

const Title = styled.span`
  color: ${({ theme }) => theme.colors.secondary};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>darlanthiago repos</title>
      </Head>
      <Container>
        {posts.map((post) => (
          <Link href={`/post/${post.id}`} key={post.uniqueId}>
            <a>
              <Title>{post.title}</Title>
            </a>
          </Link>
        ))}
      </Container>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  const mapped = data.map((post) => {
    return {
      ...post,
      uniqueId: uuidv4(),
    };
  });

  return {
    props: {
      posts: mapped,
    },
  };
}
