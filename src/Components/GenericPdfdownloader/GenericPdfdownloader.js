import html2pdf from 'html2pdf.js';
import React from 'react';


const GenericPdfdownloader = ({ rootElementId }) => {
    const downloadPdfDocument = () => {
        const input = document.getElementById(rootElementId);
        html2pdf().from(input).set({
            margin: 1,
        }).save();
    }
    return <button className='btn btn-primary btn-sm' onClick={downloadPdfDocument}>Download as Pdf</button>
};

export default GenericPdfdownloader;