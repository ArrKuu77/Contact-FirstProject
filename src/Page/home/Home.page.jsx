import React, { useEffect, useState } from "react";
import {
  ContactCardComponents,
  EmptyLottie,
  LoadingLottie,
  NavBar,
  AuthGuardComponents,
} from "../../components";
import { Button } from "../../components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { FiPlusCircle } from "react-icons/fi";
import { Outlet } from "react-router-dom";
import FormTool from "./tool/Form.tool";
import { ContactTablePage, PaginationTool } from "..";
import { useGetContactsQuery } from "../../store/service/endPoints/contact.point";

const HomePage = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const data = useGetContactsQuery(page);

  console.log(data);
  const [editData, setEditData] = useState({
    edit: false,
    data: null,
  });

  const handelEdit = (id) => {
    const finer = data.data?.contacts?.data?.find(
      (current) => current.id == id
    );
    setEditData({ edit: true, data: finer });
  };
  const handleClose = () => {
    setEditData({ edit: false, data: null });
  };
  const [chacker, setChacker] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : null
  );

  let totalPage = data?.data?.contacts?.last_page;
  // console.log(chacker);
  return (
    <AuthGuardComponents check={chacker} goPage={"/home"}>
      <Sheet>
        <div>
          <NavBar setChacker={setChacker} />

          <div className=" mt-3 py-5 ">
            <div className=" flex items-center   p-3 w-11/12 mx-auto">
              <SheetTrigger asChild>
                <Button className="bg-[#151515] text-white gap-2  ">
                  <FiPlusCircle />
                  Create Contact
                </Button>
              </SheetTrigger>
            </div>
            <ContactTablePage data={data} handelEdit={handelEdit} />
            <PaginationTool
              totalPage={totalPage}
              page={page}
              limit={limit}
              siblings={1}
              setPage={setPage}
            />
          </div>

          <SheetContent
            onClose={handleClose}
            className=" bg-black text-white h-full "
          >
            <SheetHeader>
              <SheetTitle className=" text-white my-2 font-bold">
                Contact Information
              </SheetTitle>
            </SheetHeader>
            <FormTool
              editData={editData}
              handleClose={handleClose}
              setPage={setPage}
              totalPage={totalPage}
            />
            <SheetFooter></SheetFooter>
          </SheetContent>
        </div>
      </Sheet>
    </AuthGuardComponents>
  );
};

export default HomePage;
