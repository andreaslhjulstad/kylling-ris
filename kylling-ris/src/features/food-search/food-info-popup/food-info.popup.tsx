import { useEffect, useState } from "react";
import FoodInfo from "../search-results/food-info";
// import { Dialog, Transition } from "@headlessui/react";
import styles from "./food-info-popup.module.css"
import { Dialog }from "primereact/dialog"

interface FoodInfoPopupProps {
  food: FoodInfo;
  open: boolean;
  onClose: () => void;
}

export default function FoodInfoPopup({
  food,
  open,
  onClose
}: FoodInfoPopupProps) {
  const [isOpen, setIsOpen] = useState<boolean>(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  return (
    <div>
      <Dialog
        className={styles.foodInfoPopup}
        visible={isOpen}
        onHide={onClose}
        header={food.name}
        headerStyle={ { fontWeight: 800, fontSize: "2em" }  }
        draggable={false}
        dismissableMask={true}
      >
        <button onClick={onClose}>Lukk</button>
      </Dialog>
    </div>

    // <>
    //   {isOpen && <div className={styles.overlay}></div>}
    //   <Transition show={isOpen}
    //     enter={styles.enter}
    //     enterFrom={styles.enterFrom}
    //     enterTo={styles.enterTo}
    //     leave={styles.leave}
    //     leaveFrom={styles.leaveFrom}
    //     leaveTo={styles.leaveTo}
    //   >
    //     <div ref={dialogRef}>
    //     <Dialog onClose={onClose} className={styles.foodInfoPopup}>
    //       <Dialog.Panel>
    //         <Dialog.Title>{food.name}</Dialog.Title>
    //         <Dialog.Description>{food.name}</Dialog.Description>

    //         <p>Tekst her, sjohei</p>

    //         <button onClick={onClose}>Lukk</button>
    //       </Dialog.Panel>
    //     </Dialog>
    //     </div>
    //   </Transition>
    // </>
  );
}
