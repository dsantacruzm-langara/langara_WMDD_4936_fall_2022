import { useState, useEffect } from "react";

const useFetch = (url) => {
  
    //useState can pass anything (any type data) as an argument
  //When storing the useState, you need to declare a variable
  //an the function that will change the value
  //(setName in this case).

  //Triggers with each render of the component. Just one declaration is neeeded by
  //component

  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw Error("could not fetch the data for that resource");
          }
          return response.json();
        })
        .then((data) => {
          setData(data);
          setIsPending(false);
          setError(null);
        })
        .catch((err) => {
          setIsPending(false);
          setError(err.message);
        });
    }, 1000);
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;
