import Link from "next/link";
import React, { useState } from "react";

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
    itemsPerPage,
    indexOfFirstItem,
    tabledata

}) => {
    const a = parseInt(itemsPerPage);
    const b = parseInt(indexOfFirstItem);
    const pageNumbers = Array.from(
        { length: totalPages },
        (_, index) => index + 1
    );
    const activeIndex = pageNumbers.indexOf(currentPage);

    const startIndex = Math.max(0, activeIndex - 2);
    const endIndex = Math.min(pageNumbers.length - 1, startIndex + 3);
    const buttonsToDisplay = pageNumbers?.slice(startIndex, endIndex + 1);

    return (
        <div className="d-sm-flex justify-content-between align-items-center mt-5 mb-3 text-center">
            {/* <p className="para mb-sm-0">
                Showing Products  <b>{tabledata?.data?.length > 0 ? indexOfFirstItem + 1 : 0} </b> -
                <b>
                    {a + b > tabledata?.data?.length
                        ? tabledata?.total
                        : a + b} &nbsp;
                </b>
                Of <b>{tabledata?.total}</b> Results
            </p> */}
            <div className="ms-auto">
                <ul className="pagination p-0 m-0 justify-content-center">
                    <li className="page-item my-auto">
                        <button
                            onClick={() => onPageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="bg-transparent border-0"
                        >
                            <i className="bi bi-caret-left-fill clr-primary"></i>
                        </button>
                    </li>
                    {buttonsToDisplay.map((pageNumber) => (
                        <Link
                            key={pageNumber}
                            onClick={() => onPageChange(pageNumber)}
                            href="#"
                            className={` ${pageNumber === currentPage ? "page-active" : ""}`}
                        >
                            <li>
                                <button className={`secondary-btn mx-1 rounded-1 ${pageNumber === currentPage ? "back-primary text-white" : ""}`}>{pageNumber}</button>
                            </li>
                        </Link>
                    ))}
                    <li className="page-item my-auto">
                        <button
                            onClick={() => onPageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="bg-transparent border-0"
                        >
                            <i className="bi bi-caret-right-fill clr-primary"></i>
                        </button>
                        {/* <li>  <button onClick={() => onPageChange(currentPage + 1, indexOfLastItem)} > <img src={next} alt="icon" /></button> */}
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Pagination;
