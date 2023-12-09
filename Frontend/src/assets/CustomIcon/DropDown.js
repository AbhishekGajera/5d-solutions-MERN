import React from "react";

const DropDown = ({ open }) => {
  return (
    <div>
      <svg
        width="16"
        className={`${open ? "open-sidebar" : "close-sidebar"}`}
        height="10"
        viewBox="0 0 16 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.99996 9.14221C7.72798 9.14221 7.45604 9.03836 7.24868 8.8311L0.723428 2.30578C0.308337 1.89069 0.308337 1.21769 0.723428 0.80277C1.13835 0.387846 1.81122 0.387846 2.22634 0.80277L7.99996 6.57673L13.7736 0.802971C14.1887 0.388048 14.8615 0.388048 15.2764 0.802971C15.6917 1.21789 15.6917 1.89089 15.2764 2.30598L8.75125 8.8313C8.54379 9.03859 8.27184 9.14221 7.99996 9.14221Z"
          fill="white"
        />
      </svg>
    </div>
  );
};

export default DropDown;
