import Modal from "react-modal";
import s from "./ImageModal.module.css"

const ImageModal = ({ item, isOpen, onClose }) => {
  const { urls, user, alt_description } = item;

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
    },

    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      // marginRight: "-30%",
      transform: "translate(-50%, -50%)",
      border: "10",
      background: "white",
      overflow: "visible",
    },
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        style={customStyles}
        ariaHideApp={false}
        contentLabel="Modal Image"
        closeTimeoutMS={300}
        shouldCloseOnEsc={true}
        onRequestClose={() => {
          onClose();
        }}
      >
        <img
          className={s.modalImage}
          src={urls.regular}
          alt={alt_description}
				/>
	      <p>Author: {user.username}</p>
		   </Modal>
    </div>
  );
};
export default ImageModal;