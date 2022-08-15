import React from "react";
import { Title, Body } from "./style";

interface PostProps {
  post: {
    id: number;
    title: string;
    body: string;
  };
}

export default function Post({ post }: PostProps) {
  return (
    <div>
      <Title>{post.title}</Title>
      <Body>{post.body}</Body>
    </div>
  );
}
