import React, { useEffect, useState } from "react";
import {
  ContactCardComponents,
  EmptyLottie,
  LoadingLottie,
} from "../components";
import { SheetTrigger } from "../components/ui/sheet";
import { FiPlusCircle } from "react-icons/fi";
import { Button } from "../components/ui/button";
import { useGetContactsQuery } from "../store/service/endPoints/contact.point";

const ContactsPage = () => {
  const { data, isLoading, isError, isSuccess } = useGetContactsQuery();

  const [contactItem, setContactItem] = useState([]);
  useEffect(() => {
    setContactItem(data?.contacts?.data ? data?.contacts?.data : []);
  }, [data]);
  return (
    <div>
      {isLoading ? (
        <LoadingLottie />
      ) : contactItem.length > 0 ? (
        <div className=" flex    mx-auto  justify-center items-center flex-wrap w-[90%] gap-7 ">
          <div className=" flex items-center justify-end  p-3 w-11/12 mx-auto">
            <SheetTrigger asChild>
              <Button className="bg-[#151515] text-white gap-2  ">
                <FiPlusCircle />
                Create Contact
              </Button>
            </SheetTrigger>
          </div>
          {data?.contacts?.data.map((contact) => (
            <ContactCardComponents key={contact.id} contact={contact} />
          ))}
        </div>
      ) : (
        contactItem.length == 0 && (
          <div className=" mx-auto flex justify-center items-center h-[400px] border-[#151515] border w-4/5   ">
            <EmptyLottie />
          </div>
        )
      )}

      {/* {contactItem.length > 0 ? (
        <div className=" flex    mx-auto  justify-center items-center flex-wrap w-[90%] gap-7 ">
          {data?.contacts?.data.map((contact) => (
            <ContactCardComponents key={contact.id} contact={contact} />
          ))}
        </div>
      ) : (
      <div></div>
      )} */}
    </div>
  );
};

export default ContactsPage;
