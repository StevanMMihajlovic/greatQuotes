import QuoteList from "../components/quotes/QuoteList";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import useHttp from "../hooks/use-http";
import { getAllQuotes } from "../lib/api";
import { useEffect } from "react";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const AllQuotes = () => {
  const {
    sendRequest,
    status,
    data: loadedQuotes,
    error,
  } = useHttp(getAllQuotes, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner></LoadingSpinner>
      </div>
    );
  }
  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  if (status === "completed" && loadedQuotes.lenth === 0) {
    return <NoQuotesFound></NoQuotesFound>;
  }

  return <QuoteList quotes={loadedQuotes} />;
};
export default AllQuotes;
