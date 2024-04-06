import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { useDeleteContactMutation } from "../../../store/service/endPoints/contact.point";
import { CiEdit } from "react-icons/ci";
import { MdDeleteSweep } from "react-icons/md";
import Swal from "sweetalert2";
import { EmptyLottie, LoadingLottie } from "../../../components";
import { SheetTrigger } from "../../../components/ui/sheet";
const ContactTableTool = ({ data, handelEdit }) => {
  const { data: getData, isLoading, isError } = data;
  // console.log(getData);

  const [deleteFun, currentDeleteData] = useDeleteContactMutation();
  const {
    data: deleteData,
    isLoading: deleteLoading,
    isError: deleteError,
  } = currentDeleteData;
  // console.log(deleteData, deleteLoading, deleteError);

  // const [contactItem, setContactItem] = useState([]);
  // useEffect(() => {
  //   setContactItem(data?.contacts?.data ? data?.contacts?.data : []);
  // }, [data]);
  const handleItemDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteFun(id);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };
  return (
    <div className=" my-5 border  border-orangeColor !text-white !w-max-content sm:w-[90%] mx-[auto]">
      {isLoading ? (
        <LoadingLottie />
      ) : getData?.contacts?.data.length > 0 ? (
        <div className=" flex    mx-auto my-3  justify-center items-center flex-wrap w-[98%] gap-7 ">
          <Table className="w-[1000px] sm:w-full">
            <TableHeader>
              <TableRow className=" hover:bg-[#151515] bg-[#151515] border-b border-orangeColor ">
                <TableHead className="rounded-l-2xl">NO</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>PhoneNumber</TableHead>
                <TableHead>Address</TableHead>
                <TableHead className=" text-center rounded-r-2xl">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getData?.contacts?.data.map((i, index) => (
                <TableRow
                  key={i.id}
                  className=" hover:bg-[#151515]  border-b border-orangeColor"
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{i.name}</TableCell>
                  <TableCell>{i.email}</TableCell>
                  <TableCell>{i.phone}</TableCell>
                  <TableCell>{i.address}</TableCell>
                  <TableCell className=" text-2xl space-x-3 flex justify-center">
                    <SheetTrigger>
                      <button
                        onClick={handelEdit.bind(null, i.id)}
                        className=" hover:text-orangeColor"
                      >
                        <CiEdit />
                      </button>
                    </SheetTrigger>
                    <button onClick={handleItemDelete.bind(null, i.id)}>
                      <MdDeleteSweep className=" hover:text-red-500" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        data?.contacts?.data.length == 0 && (
          <div className=" mx-auto flex justify-center items-center h-[400px] border-[#151515] border w-4/5   ">
            <EmptyLottie />
          </div>
        )
      )}
    </div>
  );
};

export default ContactTableTool;
