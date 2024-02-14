import get from "lodash";
import React from "react";
import clsx from "clsx";
import Image from "next/image";

const GridBody = ({
  pageSize = 24,
  page = 1,
  handleSort = () => {},
  columns = [],
}) => {
  return (
    <div className={"overflow-x-scroll"}>
      <table className={"bg-white w-full overflow-x-scroll mb-8 align-middle"}>
        <thead>
          <tr>
            {columns &&
              columns.map((th) => (
                <th className={"py-2.5 px-5"}>
                  <div></div>
                </th>
              ))}
          </tr>
        </thead>
      </table>
    </div>
  );
};
