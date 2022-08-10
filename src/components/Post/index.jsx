import React from "react";
import { Title, Body } from "./style";

export default function Post({ post }) {
  return (
    <div>
      <Title>{post.title}</Title>
      <Body>{post.body}</Body>
    </div>
  );
}
