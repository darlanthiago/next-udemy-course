import React from "react";
import { useRouter } from "next/router";
import Post from "../../components/Post";
import Comment from "../../components/Comment";

export default function RepoView({ post, comments }) {
  const router = useRouter();
  return (
    <>
      <button onClick={() => router.back()}>Back</button>
      <h1>Post</h1>
      <Post post={post} />
      <hr />
      <h1>Comments</h1>
      {comments.map((comment, index) => (
        <Comment comment={comment} key={index} />
      ))}
    </>
  );
}

export const getStaticPaths = async () => {
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

export const getStaticProps = async ({ params }) => {
  const post = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`
  );

  const postJson = await post.json();

  const comments = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}/comments`
  );

  const commentsJson = await comments.json();

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post: postJson,
      comments: commentsJson,
    },
  };
};
