import { useHistory } from "react-router";

import QuoteForm from "../components/quotes/QuoteForm";
import useHttp from "../hooks/use-http";
import { addQuote } from "../lib/api";
import { useEffect } from "react";

const NewQuotes = () => {
  const { sendRequest, status } = useHttp(addQuote);
  const history = useHistory();

  useEffect(() => {
    if (status === "completed") {
      history.push("/quotes");
    }
  }, [history, status]);

  const addQuoteHandler = (newQuote) => {
    sendRequest(newQuote);
  };
  return (
    <QuoteForm onAddQuote={addQuoteHandler} isLoading={status === "pending"} />
  );
};
export default NewQuotes;
