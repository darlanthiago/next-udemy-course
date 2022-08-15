import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import Post from "../../components/Post";
import Comment from "../../components/Comment";
import { isEmpty } from "../../utils/array";

type Post = {
  id: number;
  title: string;
  body: string;
};

type Comment = {
  id: number;
  name: string;
  email: string;
  body: string;
};

type RepoViewProps = {
  post: Post;
  comments: Comment[];
};

export default function RepoView({ post, comments }: RepoViewProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <button onClick={() => router.back()}>Back</button>
      <h1>Post</h1>
      <Post post={post} />
      <hr />
      <h1>Comments</h1>
      {!isEmpty(comments) ? (
        comments.map((comment, index) => (
          <Comment comment={comment} key={index} />
        ))
      ) : (
        <span>No comments</span>
      )}
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  // const data = await response.json();

  // const paths = data.map((post) => {
  //   return {
  //     params: {
  //       id: String(post.id),
  //     },
  //   };
  // });

  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`
  );

  const postJson: Post[] = await post.json();

  if (!postJson || isEmpty(postJson)) {
    return {
      notFound: true,
    };
  }

  const comments = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}/comments`
  );

  const commentsJson: Comment[] = await comments.json();

  return {
    props: {
      post: postJson,
      comments: commentsJson,
    },
    revalidate: 30,
  };
};
