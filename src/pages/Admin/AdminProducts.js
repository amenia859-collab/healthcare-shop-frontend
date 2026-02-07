import { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useMemo } from "react";
import "./AdminDashboard.css";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const token = localStorage.getItem("authToken");
  const headers = useMemo(
    () => ({
      headers: { Authorization: `Bearer ${token}` },
    }),
    [token],
  );

  useEffect(() => {
    axios
      .get("https://healthcare-shop-backend.onrender.com/api/products")
      .then((res) => setProducts(res.data))
      .catch(() => console.log("Products error"));
  }, [headers]);

  /* ================= HANDLERS ================= */
  const handleClose = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  const handleAddProduct = () => {
    setEditingProduct({
      name: "",
      price: "",
      category: "",
      description: "",
      utilisation: "",
      caracteristiques: [],
      imageUrl: "",
      stock: 0,
    });
    setShowModal(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const deleteProduct = (id) => {
    if (!window.confirm("Delete this product?")) return;

    axios
      .delete(
        `https://healthcare-shop-backend.onrender.com/api/products/${id}`,
        headers,
      )
      .then(() => setProducts(products.filter((p) => p._id !== id)))
      .catch(() => alert("Delete failed"));
  };

  const saveProduct = async () => {
    try {
      const request = editingProduct._id
        ? axios.put(
            `https://healthcare-shop-backend.onrender.com/api/products/${editingProduct._id}`,
            editingProduct,
            headers,
          )
        : axios.post(
            "https://healthcare-shop-backend.onrender.com/api/products",
            editingProduct,
            headers,
          );

      const res = await request;

      if (editingProduct._id) {
        setProducts(
          products.map((p) => (p._id === res.data._id ? res.data : p)),
        );
      } else {
        setProducts([...products, res.data]);
      }

      handleClose();
    } catch (err) {
      alert("Error saving product");
      console.error(err.response?.data || err.message);
    }
  };

  /* PRODUCTS */
  return (
    <>
      <div className="products-header">
        <h2>Products</h2>
        <button className="add-product-btn" onClick={handleAddProduct}>
          ➕ Add Product
        </button>
      </div>

      <table className="products-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>
                <img src={p.imageUrl} alt={p.name} />
              </td>
              <td>{p.name}</td>
              <td>{p.price} DT</td>
              <td>{p.category}</td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => handleEditProduct(p)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => deleteProduct(p._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingProduct?._id ? "Edit Product" : "Add Product"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            {/* NAME */}
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                value={editingProduct?.name || ""}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, name: e.target.value })
                }
              />
            </Form.Group>

            {/* DESCRIPTION */}
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Product description..."
                value={editingProduct?.description || ""}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    description: e.target.value,
                  })
                }
              />
            </Form.Group>

            {/* PRICE */}
            <Form.Group className="mb-3">
              <Form.Label>Price (DT)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={editingProduct?.price || ""}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    price: e.target.value,
                  })
                }
              />
            </Form.Group>

            {/* CATEGORY */}
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={editingProduct?.category || ""}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    category: e.target.value,
                  })
                }
              />
            </Form.Group>

            {/* UTILISATION */}
            <Form.Group className="mb-3">
              <Form.Label>Utilisation</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="How to use this product"
                value={editingProduct?.utilisation || ""}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    utilisation: e.target.value,
                  })
                }
              />
            </Form.Group>

            {/* CARACTERISTIQUES */}
            <Form.Group className="mb-3">
              <Form.Label>Caractéristiques</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="One characteristic per line"
                value={(editingProduct?.caracteristiques || []).join("\n")}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    caracteristiques: e.target.value
                      .split("\n")
                      .map((c) => c.trim())
                      .filter(Boolean),
                  })
                }
              />
              <Form.Text muted>
                Example: Sans sucre ↵ Vitamine C ↵ Usage quotidien
              </Form.Text>
            </Form.Group>

            {/* IMAGE */}
            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="https://example.com/image.jpg"
                value={editingProduct?.imageUrl || ""}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    imageUrl: e.target.value,
                  })
                }
              />
            </Form.Group>

            {/* STOCK */}
            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                value={editingProduct?.stock || 0}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    stock: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={saveProduct}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default AdminProducts;
