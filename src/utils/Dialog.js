import React from "react";

const Dialog = props => {
    return (
        <dialog open id="modal"  class="modal">
            <button id="closeModal" class="modal-close-btn">Close</button>
            <p>...</p>
        </dialog>
    );
};

export default Dialog;