import React from "react";
import { Name, Email, Body } from "./style";

export default function Comment({ comment }) {
  return (
    <div>
      <Name>{comment.name}</Name>
      <Email>{comment.email}</Email>
      <Body>{comment.body}</Body>

      <hr />
    </div>
  );
}
