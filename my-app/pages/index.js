import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const [error, setError] = useState("");
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/login");
    }
  }, []);

  // For custom modal
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const CustomModal = ({ show, onClose, onConfirm, item }) => {
    if (!show) {
      return null;
    }

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Delete Item</h2>
          <p>Are you sure you want to delete "{item?.name}"?</p>
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
          <button className="btn btn-primary" onClick={onConfirm}>
            Confirm Delete
          </button>
        </div>
      </div>
    );
  };

  const handleDeleteClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleConfirmDelete = (e) => {
    e.preventDefault();

    if (selectedItem && selectedItem.id) {
      axios
        .delete(`http://127.0.0.1:5000/api/items/${selectedItem.id}`)
        .then((response) => {
          setItems((prevItems) =>
            prevItems.filter((item) => item.id !== selectedItem.id)
          );
          console.log("Item deleted:", selectedItem);
          setShowModal(false);
        })
        .catch((error) => console.error("Error deleting item:", error));
    } else {
      console.error("No item selected for deletion");
    }
  }; // End for custom modal

  // Fetching data
  const [items, setItems] = useState([]);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/items")
      .then((response) => {
        setItems(response.data);
        console.log("Fetched items:", JSON.stringify(response.data, null, 2));
      })
      .catch((error) => console.error("Error fetching items:", error));
  }, []);

  const handleLogout = async (e) => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/api/logout");
      if (response.status === 200) {
        localStorage.removeItem("user");
        router.push("/login");
      }
    } catch (error) {
      setError(error.message);
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Items List</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Price</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {items.length > 0 ? (
            items.map((item) => (
              <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>
                  <a
                    href={`/item/${item.id}/update`}
                    className="btn btn-success m-1"
                  >
                    Edit
                  </a>
                  <button
                    type="button"
                    className="btn btn-danger m-1"
                    onClick={() => handleDeleteClick(item)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No items found</td>
            </tr>
          )}
        </tbody>
      </table>
      <a href="/create-item" className="btn btn-primary m-2">
        Create New Item
      </a>
      <button
        type="button"
        onClick={() => handleLogout()}
        className="btn btn-danger m-2"
      >
        Logout
      </button>

      <CustomModal
        show={showModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        item={selectedItem}
      />
    </div>
  );
}
