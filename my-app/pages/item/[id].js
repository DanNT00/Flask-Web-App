import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ItemDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [item, setItem] = useState(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://127.0.0.1:5000/api/items/${id}`)
        .then((response) => {
          console.log("Updated Item: ", JSON.stringify(response.data, null, 2));
          setItem(response.data);
        })
        .catch((error) => console.error("Error fetching item:", error));
    }
  }, [id]);

  if (!item) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h1 className="card-title">Item Details Updated</h1>
        </div>
        <div className="card-body">
          <h5 className="card-title">Name: {item.name}</h5>
          <p className="card-text">Description: {item.description}</p>
          <p className="card-text">
            Price: <strong>${item.price}</strong>
          </p>
          <a href="/" className="btn btn-success">
            Return to Home
          </a>
        </div>
      </div>
    </div>
  );
}
