import React, { useState } from "react";

export default function ModalEditProduct(props) {
  const { products, setProducts, editProduct, setEditProduct } = props;
  const [newItemsRegister, setNewItemsRegister] = useState(null);

  const editProductItem = () => {
    editProduct.registrados = newItemsRegister;
    const temporalProducts = [...products];
    setProducts(temporalProducts);
    setEditProduct(null);
  };

  return (
    <div
      className="modal fade col-10"
      id="modalEditProduct"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Editar Producto con sku: {editProduct.sku}
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <input
              type="number"
              className="form-control"
              placeholder="items registrados"
              onChange={(e) => setNewItemsRegister(e.target.value)}
            />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Cancelar
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-dismiss="modal"
              onClick={() => editProductItem()}
            >
              Registrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
