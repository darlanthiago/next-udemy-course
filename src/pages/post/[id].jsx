import React from "react";
import { useRouter } from "next/router";
import Post from "../../components/Post";
import Comment from "../../components/Comment";
import { isEmpty } from "../../utils/array";

export default function RepoView({ post, comments }) {
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

  if (!postJson || isEmpty(postJson)) {
    return {
      notFound: true,
    };
  }

  const comments = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}/comments`
  );

  const commentsJson = await comments.json();

  return {
    props: {
      post: postJson,
      comments: commentsJson,
    },
    revalidate: 30,
  };
};
