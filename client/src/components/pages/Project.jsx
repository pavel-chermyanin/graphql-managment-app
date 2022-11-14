import { useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { GET_PROJECT } from "../../queries/projectQueries";
import Spinner from "../Spinner";

const Project = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT,{variables: {id}});

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong</p>;

  return <div>Project</div>;
};

export default Project;
