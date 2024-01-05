import React from "react";

const Model = ({
  show,
  handleClose,
  handleConfirm,
  title,
  body,
  itemToDelete,
}) => {
  return (
    <div
      className={`modal fade${show ? " show" : ""}`}
      style={{
        display: show ? "block" : "none",
        overflowY: "auto",
        backdropFilter: "blur(3px)",
      }}
      tabIndex="-1"
      role="dialog"
      aria-labelledby="confirmModalLabel"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-dialog-centered"
        role="document"
        style={{ backgroundColor: "transparent" }}
      >
        <div className="modal-content" style={{ backgroundColor: "#374151" }}>
          <div className="modal-header" style={{ backgroundColor: "#374151" }}>
            <h5 className="modal-title" id="confirmModalLabel">
              {title}
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={handleClose}
            >
              <span
                aria-hidden="true"
                style={{ border: "none", outline: "none",padding:"0 4px",fontWeight:"900",fontSize:"20px" }}
              >
                <i className="bi bi-x"></i>
              </span>
            </button>
          </div>
          <div className="modal-body" style={{ backgroundColor: "#374151" }}>
            {body}
          </div>
          <div className="modal-footer" style={{ backgroundColor: "#374151" }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => handleConfirm(itemToDelete)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Model;
