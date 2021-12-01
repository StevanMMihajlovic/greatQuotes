import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router";
import useHttp from "../../hooks/use-http";
import { getAllComments } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import CommentsList from "../comments/CommentsList";

import classes from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params = useParams();

  const { quotesId } = params;

  const { sendRequest, status, data: loadedComments } = useHttp(getAllComments);

  useEffect(() => {
    sendRequest(quotesId);
  }, [quotesId, sendRequest]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const addedCommentHandler = useCallback(() => {
    sendRequest(quotesId);
  }, [sendRequest, quotesId]);

  let comments;

  if (status === "pending") {
    comments = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (status === "completed" && loadedComments.length > 0) {
    comments = <CommentsList comments={loadedComments} />;
  }

  if (status === "completed" && loadedComments.length === 0) {
    comments = <p className="centered">No comments found.</p>;
  }
  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm
          quotesId={quotesId}
          onAddedComment={addedCommentHandler}
        />
      )}
      {comments}
    </section>
  );
};

export default Comments;
