import { useParams, Route } from "react-router";
import React from "react";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import { Link, useRouteMatch } from "react-router-dom";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import { useEffect } from "react";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const DetailQuotes = () => {
  const match = useRouteMatch();
  const params = useParams();

  const {
    sendRequest,
    status,
    data: LoadedQuote,
    error,
  } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(params.quotesId);
  }, [sendRequest, params.quotesId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }
  if (error) {
    return <p className="centered">{error}</p>;
  }

  if (!LoadedQuote.text) {
    return <h1>No quote found!</h1>;
  }

  return (
    <React.Fragment>
      <HighlightedQuote text={LoadedQuote.text} author={LoadedQuote.author} />
      <Route path={match.path} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Show comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </React.Fragment>
  );
};
export default DetailQuotes;
