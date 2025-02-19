import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FaPlus } from "react-icons/fa";
import styled from "styled-components";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

function Modal({ children, isOpen, onClose }: ModalProps) {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleClose = () => {
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleClose();
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      handleClose();
    }
  };

  const handleAnimationEnd = () => {
    if (isFadingOut) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  if (isOpen) {
    return;
  }

  return createPortal(
    <ModalStyle
      className={isFadingOut ? "fade-out" : "fade-in"}
      onClick={handleOverlayClick}
    >
      <div className="modal-body">
        <div className="modal-contents">{children}</div>
        <button className="modal-close" onClick={handleClose}>
          <FaPlus />
        </button>
      </div>
    </ModalStyle>,
    document.body
  );
}

const ModalStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.6);

  .modal-body {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 56px 32px 32px;

    background-color: #fff;
    mad-width: 80%;
  }

  .modal-close {
    border: none;
    background-color: transparent;
    cursor: pointer;

    position: absolute;
    top: 0;
    right: 0;
    padding: 12px;

    svg {
      width: 20px;
      height: 20px;
      transform: rotate(45deg);
    }
  }
`;

export default Modal;
