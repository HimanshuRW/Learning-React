import { useRef,useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({ children,isOpen }) {
  const dialog = useRef();

  useEffect(()=>{
    if(isOpen){
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  },[isOpen]);

  return createPortal(
    <dialog className="modal" ref={dialog}>
      {children}
    </dialog>,
    document.getElementById('modal')
  );
}