import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function CreateItem() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:5000/api/items", {
        name,
        description,
        price: parseFloat(price),
      })
      .then((response) => {
        console.log("Created item:", JSON.stringify(response.data, null, 2)); // Log the created item in JSON format
        router.push("/");
      })

      .catch((error) => {
        console.error("Error creating item:", error);
        alert("Name must be filled. Price should be a postive number");
      });
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <h1 className="mb-4">Create New Item</h1>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name:
        </label>
        <input
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
          type="number"
          className="form-control"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary m-1">
        Create Item
      </button>
      <a href="/" className="btn btn-success m-1">
        Return to Home
      </a>
    </form>
  );
}
