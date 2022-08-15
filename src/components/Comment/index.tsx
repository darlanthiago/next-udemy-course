import React from "react";
import { Name, Email, Body } from "./style";

interface CommentProps {
  comment: {
    id: number;
    name: string;
    email: string;
    body: string;
  };
}

export default function Comment({ comment }: CommentProps) {
  return (
    <div>
      <Name>{comment.name}</Name>
      <Email>{comment.email}</Email>
      <Body>{comment.body}</Body>

      <hr />
    </div>
  );
}
