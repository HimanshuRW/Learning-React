import { createPortal } from 'react-dom';
import { motion } from 'framer-motion'; 
export default function Modal({ title, children, onClose }) {
  return createPortal(
    <>
      <div className="backdrop" onClick={onClose} />
      <motion.dialog open className="modal"
        variants={{
          myHidden : {opacity:0,y:30},
          myVisible : {opacity:1,y:0}
        }}
        initial="myHidden"
        animate = "myVisible"
        exit="myHidden"
      >
        <h2>{title}</h2>
        {children}
      </motion.dialog>
    </>,
    document.getElementById('modal')
  );
}
