import React, { useState } from "react";

function DeleteProduct({ onDeleteProduct, productId }) {
  // State untuk mengontrol tampilan konfirmasi penghapusan
  const [isDeleteAlertVisible, setIsDeleteAlertVisible] = useState(false);

  // Fungsi untuk menampilkan konfirmasi penghapusan
  const showDeleteAlert = () => {
    setIsDeleteAlertVisible(true);
  };

  // Fungsi untuk menyembunyikan konfirmasi penghapusan
  const hideDeleteAlert = () => {
    setIsDeleteAlertVisible(false);
  };

  // Fungsi yang dipanggil saat pengguna mengonfirmasi penghapusan
  const handleDelete = () => {
    onDeleteProduct(productId); // Memanggil onDeleteProduct dengan ID produk yang akan dihapus
    hideDeleteAlert(); // Menyembunyikan konfirmasi penghapusan
  };

  return (
    <div className="font-sans">
      {/* Tombol untuk menampilkan konfirmasi penghapusan */}
      <button
        onClick={showDeleteAlert}
        className="font-medium text-red-600 dark:text-red-500 hover:underline"
      >
        Delete
      </button>
      {isDeleteAlertVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 font-sans">
          <div className="bg-white w-1/3 p-4 rounded-lg">
            <h2 className="text-2xl font-semibold mb- text-slate-700 mb-5">Delete Product</h2>
            <p className="capitalize">Are you sure you want to delete this product?</p>
            <div className="flex justify-center gap-4 mt-12">
              {/* Tombol untuk mengkonfirmasi penghapusan atau membatalkannya */}
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
              >
                Delete
              </button>
              <button
                onClick={hideDeleteAlert}
                className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 ml-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeleteProduct;
