import React, { useEffect, useState } from "react";
import AddProduct from "./addNewProduct";
import EditProduct from "./editProduct";
import DeleteProduct from "./deleteProduct";

function TableP() {
  // State untuk menyimpan daftar produk
  const [products, setProducts] = useState([]);

  // State untuk menyimpan data produk baru yang akan ditambahkan
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });

  // State untuk menangani pesan kesalahan
  const [error, setError] = useState("");

  // State untuk mengontrol tampilan form tambah produk
  const [isAddProductCardVisible, setIsAddProductCardVisible] = useState(false);

  // State untuk mengontrol tampilan form edit produk
  const [isEditVisible, setIsEditVisible] = useState(false);

  // State untuk menyimpan data produk yang akan diedit
  const [editProduct, setEditProduct] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    image: "",
    id: null,
  });

  // Fungsi untuk menampilkan/menyembunyikan form tambah produk
  const toggleAddProductCardVisibility = () => {
    setIsAddProductCardVisible(!isAddProductCardVisible);
  };

  // Fungsi untuk menangani klik tombol edit produk
  const handleEditClick = (product) => {
    setEditProduct({
      title: product.title,
      price: product.price,
      category: product.category,
      description: product.description,
      image: product.image,
      id: product.id,
    });
    setIsEditVisible(true);
  };

  // Mengambil data produk dari API saat komponen dimuat
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
  }, []);

  // Fungsi untuk menghapus produk
  const deleteProduct = (id) => {
    fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        console.log(`Product with ID ${id} has been deleted`);
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== id)
        );
      })
      .catch((error) => console.error(error));
  };

  // Fungsi untuk menangani penambahan produk baru
  const handleAddProduct = (newProduct) => {
    if (
      !newProduct.title ||
      !newProduct.price ||
      !newProduct.category ||
      !newProduct.description ||
      !newProduct.image
    ) {
      setError("Tolong isi semua form");
      return;
    }

    setProducts((prevProducts) => [...prevProducts, newProduct]);
    setNewProduct({
      title: "",
      price: "",
      category: "",
      description: "",
      image: "",
    });
    setError("");
    toggleAddProductCardVisibility();
  };

  return (
    <div className="font-sans">
      {/* Header */}
      <div className="mb-4 flex justify-between pl-[3%] pr-[3%] mt-2">
        <div>
          <h1 className="text-3xl font-semibold italic text-slate-700 font-serif">
            Table Product
          </h1>
        </div>
        {/* Tombol untuk menampilkan form tambah produk */}
        <button
          onClick={toggleAddProductCardVisibility}
          className="bg-slate-500 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded"
        >
          Add New Product
        </button>
      </div>

      {/* Form tambah produk */}
      {isAddProductCardVisible && (
        <AddProduct
          onAddProduct={(newProduct) => {
            handleAddProduct(newProduct);
          }}
        />
      )}

      {/* Form edit produk */}
      {isEditVisible && (
        <EditProduct
          initialProduct={editProduct}
          onSaveEdit={(updatedProduct) => {
            fetch(`https://fakestoreapi.com/products/${updatedProduct.id}`, {
              method: "PUT",
              body: JSON.stringify(updatedProduct),
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((res) => res.json())
              .then((json) => {
                console.log("Product updated:", json);
                const updatedProducts = products.map((p) =>
                  p.id === updatedProduct.id ? updatedProduct : p
                );
                setProducts(updatedProducts);
                setIsEditVisible(false);
              })
              .catch((error) => console.error(error));
          }}
          onCancelEdit={() => setIsEditVisible(false)}
        />
      )}

      {/* Tabel produk */}
      <div className="relative shadow-md  ">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-slate-200 text-center">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
              >
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  <div className="flex gap-3">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-10 h-12 object-contain"
                    />
                    <p className="text-slate-200">{product.title}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-center text-slate-300">${product.price}</td>
                <td className="px-6 py-4 text-center capitalize text-slate-300">
                  {product.category}
                </td>
                <td className="px-6 py-4 text-slate-300">{product.description}</td>
                <td className="px-6 py-4 flex gap-5 text-center">
                  <button
                    onClick={() => handleEditClick(product)}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <DeleteProduct
                    onDeleteProduct={deleteProduct}
                    productId={product.id}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableP;
