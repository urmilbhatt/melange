import React, { useState } from "react";
import { useLazyQuery, gql } from "@apollo/client";
import InputForm from "./shared/InputForm";
import Planets from "./Planets";

const SEARCH = gql`
  query Search($match: String) {
    planets(order_by: { name: asc }, where: { name: { _ilike: $match } }) {
      name
      cuisine
      id
    }
  }
`;

const PlanetSearch = () => {
  const [inputVal, setInputVal] = useState("");
  const [search, { loading, error, data }] = useLazyQuery(SEARCH);

  if (error) return <p>Error :(</p>;

  return (
    <div>
      <InputForm
        inputVal={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
        onSubmit={() => inputVal && search({ variables: { match: `%${inputVal}%` } })}
      />
      {loading ? <p>Loading ...</p> : <Planets newPlanets={data ? data.planets : null} />}
    </div>
  );
};

export default PlanetSearch;