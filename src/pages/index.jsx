import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

const Title = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const PostContainer = styled.a`
  display: flex;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  padding: 15px 20px;
  margin-bottom: 10px;
  background: ${({ theme }) => theme.colors.secondary};
  border-radius: 10px;
  text-decoration: none;

  &:last-child {
    margin-bottom: none;
  }
`;

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>darlanthiago repos</title>
      </Head>
      <Container>
        {posts.map((post) => (
          <Link href={`/post/${post.id}`} key={post.uniqueId} passHref>
            <PostContainer>
              <Title>{post.title}</Title>
            </PostContainer>
          </Link>
        ))}
      </Container>
    </>
  );
}

export async function getStaticProps(ctx) {
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
