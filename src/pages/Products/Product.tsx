import { useEffect, useState } from "react";
import Wrapper from "../../components/Wrapper";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPlus,
  faPencil,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import useProduct from "../../Api/useProduct";
import { ProductData } from "../../services/baseData";

const Product = () => {
  const { products, fetchAllProducts, deleteProduct } = useProduct();
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch all products and handle errors
  const fetchData = async () => {
    try {
      await fetchAllProducts();
      setLoading(false);
    } catch (error) {
      setError(error as Error);
      setLoading(false);
    }
  };

  // Function to handle product deletion
  const handleDelete = async (product: ProductData) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmDelete) {
      try {
        await deleteProduct(product);
        // Refresh the product list after successful deletion
        await fetchAllProducts();
      } catch (error) {
        console.error("Failed to delete product", error);
        setError(error as Error);
      }
    }
  };

  // Fetch products on component mount
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Wrapper>
      <nav aria-label="breadcrumb" className="mx-3">
        <ol className="breadcrumb pt-3">
          <li className="breadcrumb-item active" aria-current="page">
            Product
          </li>
        </ol>
      </nav>

      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-title mt-2 mx-3">
                <h5 className="float-left">List of Products</h5>
                <Link to="/new-product" className="btn btn-success float-right">
                  New <FontAwesomeIcon icon={faPlus} />
                </Link>
              </div>
              <div className="card-body">
                {loading ? (
                  <div className="alert alert-info">Loading products...</div>
                ) : error ? (
                  <div className="alert alert-danger">
                    Error: {error.message}
                  </div>
                ) : products.length > 0 ? (
                  <table className="table table-striped">
                    <thead className="thead-dark">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((productData, index) => (
                        <tr key={productData.id}>
                          <th scope="row">{index + 1}</th>
                          <td>{productData.title}</td>
                          <td>{productData.price}</td>
                          <td>
                            <Link
                              to={`/product/${productData.id}`}
                              className="text-success rounded-circle mx-1"
                              aria-label={`View ${productData.title}`}
                            >
                              <FontAwesomeIcon icon={faEye} />
                            </Link>
                            <Link
                              to={`/product/${productData.id}/edit`}
                              className="mx-1"
                              aria-label={`Edit ${productData.title}`}
                            >
                              <FontAwesomeIcon icon={faPencil} />
                            </Link>
                            <button
                              className="text-danger border-0 rounded-circle mx-1"
                              onClick={() => handleDelete(productData)}
                              aria-label={`Delete ${productData.title}`}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No products found.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Product;
