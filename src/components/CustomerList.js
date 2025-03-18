import React, { useEffect, useState, useMemo } from "react";
import API from "../api";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import "bootstrap/dist/css/bootstrap.min.css";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    API.get("/customers", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => setCustomers(res.data))
      .catch((err) => console.error("Gagal mengambil data pelanggan", err));
  }, []);

  const columns = useMemo(
    () => [
      { accessorKey: "name", header: "Name" },
      { accessorKey: "email", header: "Email" },
      { accessorKey: "phone", header: "Phone" },
    ],
    []
  );

  const table = useReactTable({
    data: customers,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination: {
        pageSize,
        pageIndex,
      },
    },
    onPaginationChange: (updater) => {
      const newState = typeof updater === "function" ? updater({ pageSize, pageIndex }) : updater;
      setPageSize(newState.pageSize);
      setPageIndex(newState.pageIndex);
    },
  });

  return (
    <div className="container mt-4">
      <h2 class="page-title" className="mb-3">Customer List</h2>
      <table className="table table-striped">
        <thead className="table-dark">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-between mt-3">
        <button className="btn btn-primary" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </button>
        <span> Page {table.getState().pagination.pageIndex + 1} </span>
        <button className="btn btn-primary" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </button>
      </div>
    </div>
  );
};

export default CustomerList;
