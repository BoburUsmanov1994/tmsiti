import React from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const ExportTable = () => {
    const tableData = [
        { Name: "John", Surname: "Doe", Price: 100, Phone: "123-456-7890", Address: "123 Main St" },
        { Name: "Jane", Surname: "Smith", Price: 150, Phone: "234-567-8901", Address: "456 Oak St" },
        { Name: "Jim", Surname: "Brown", Price: 200, Phone: "345-678-9012", Address: "789 Pine St" },
        { Name: "Jill", Surname: "Johnson", Price: 250, Phone: "456-789-0123", Address: "101 Maple St" },
        { Name: "Jack", Surname: "Williams", Price: 300, Phone: "567-890-1234", Address: "202 Elm St" }
    ];

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(tableData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "TableData");
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(data, "table_export.xlsx");
    };

    return (
        <div>
            <table border="1">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Price</th>
                    <th>Phone</th>
                    <th>Address</th>
                </tr>
                </thead>
                <tbody>
                {tableData.map((row, index) => (
                    <tr key={index}>
                        <td>{row.Name}</td>
                        <td>{row.Surname}</td>
                        <td>{row.Price}</td>
                        <td>{row.Phone}</td>
                        <td>{row.Address}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button onClick={exportToExcel}>Export to Excel</button>
        </div>
    );
};

export default ExportTable;