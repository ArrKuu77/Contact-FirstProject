import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../../components/ui/pagination";
import { array } from "yup";
import { returnPaginationRange } from "../../utils/appUtils";
import { isAction } from "@reduxjs/toolkit";

const PaginationTool = ({ totalPage, page, limit, siblings, setPage }) => {
  let arr = returnPaginationRange(totalPage, page, limit, siblings);
  const handlePagination = (e) => {
    console.log(parseInt(e.target.innerHTML));
    setPage(e.target.innerHTML);
  };
  const handlePrevNext = (previous, next) => {
    console.log(previous, next);
    if (previous == "previous") {
      page > 1 && setPage(page - 1);
    } else if (next == "next") {
      page < totalPage && setPage(page + 1);
    }
  };
  return (
    <div>
      <Pagination>
        <PaginationContent>
          {/* Previous Buttom */}
          <PaginationItem className=" cursor-pointer select-none">
            <PaginationPrevious
              onClick={handlePrevNext.bind(null, "previous", null)}
            />
          </PaginationItem>

          {arr.map((value, index) => (
            <PaginationItem className=" cursor-pointer select-none" key={index}>
              {value == "..." ? (
                <PaginationEllipsis>{value}</PaginationEllipsis>
              ) : (
                <PaginationLink
                  className={` bg-[2F2F2F] border border-orangeColor ${
                    value == page && "bg-[#2F2F2F]"
                  }`}
                  isActive={value == page}
                  onClick={handlePagination}
                >
                  {value}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          {/* {newArray.map((number) => (
            <PaginationItem key={number}>
              <PaginationLink>{number}</PaginationLink>
            </PaginationItem>
          ))} */}

          {/* <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem> */}
          {/* Next buttom */}
          <PaginationItem>
            <PaginationNext
              className=" cursor-pointer select-none"
              onClick={handlePrevNext.bind(null, null, "next")}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationTool;
