import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";

export default function UpdateItem() {
  const router = useRouter();
  const { id } = router.query;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (id) {
      axios
        .get(`http://127.0.0.1:5000/api/items/${id}`)
        .then((response) => {
          const item = response.data;
          setName(item.name);
          setDescription(item.description);
          setPrice(item.price);
        })
        .catch((error) => console.error("Error fetching item:", error));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://127.0.0.1:5000/api/items/${id}`, {
        name,
        description,
        price: parseFloat(price),
      })
      .then(() => router.push(`/item/${id}`))
      .catch((error) => {
        console.error("Error updating item:", error);
        alert("Name must be filled. Price should be a postive number");
      });
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <h1 className="mb-4">Update Item</h1>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name:
        </label>
        <input
          id="name"
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description:
        </label>
        <input
          id="description"
          type="text"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="price" className="form-label">
          Price:
        </label>
        <input
          id="price"
          type="number"
          className="form-control"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary m-1">
        Update Item
      </button>
      <a href="/" className="btn btn-success m-1">
        Return to Home
      </a>
    </form>
  );
}
