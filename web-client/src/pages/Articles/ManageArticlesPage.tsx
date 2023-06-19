// Redux
import { useAppDispatch } from "../../store/hooks";
// Services
import { useGetArticlesQuery } from "../../services/articleQuery";
import { useEffect } from "react";

const ManageArticlesPage = () => {
  const { data: articles, isLoading, error } = useGetArticlesQuery(undefined);

  useEffect(() => {
    if (articles) console.log(articles);
  }, [articles]);

  return (
    <>
      <h1>Manage Articles Page</h1>
      {isLoading ? <p>Getting articles....</p> : null}
    </>
  );
};

export default ManageArticlesPage;
