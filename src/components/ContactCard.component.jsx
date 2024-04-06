import React, { useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { BiSolidUserDetail } from "react-icons/bi";
import { MdOutlineDeleteForever } from "react-icons/md";
import { Button } from "./ui/button";
const ContactCardComponent = ({ contact }) => {
  return (
    <div className="  bg-[#151515] w-72 relative   px-2 flex justify-between items-center mt-2 py-2">
      <div className=" absolute top-[-30px] left-[-25px]  ">
        <Button className={" bg-[#EA3481]  rounded-full text-xl "}>
          <MdOutlineDeleteForever className="   " />
        </Button>
        {/* <FormButtomComponent
      onClick={handleGoItemDelete.bind(this, id)}
      style={" bg-red-700  rounded-full"}
    >
      <MdOutlineDeleteForever className=" ml-[-5px]  " />
    </FormButtomComponent> */}
      </div>
      <div>
        <div className=" flex  items-center gap-2 ">
          <FaUser />
          <p>{contact.name}</p>
        </div>
        <div className=" flex  items-center gap-2 ">
          <FaPhoneSquareAlt />
          <p>{contact.phone}</p>
        </div>
      </div>
      <div>
        <Button className=" bg-orangeColor">
          <div className=" flex  items-center gap-2 ">
            <BiSolidUserDetail />
            <p>Detail</p>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default ContactCardComponent;
