import React, { useRef } from "react";
import QRCode from "react-qr-code";
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";

const QrCodeGenerate = () => {
  const qrCodeValue = "76920137@ybl";
  const qrCodeComponentRef = useRef();

  // Function to handle PDF generation and download
  const handleDownloadPDF = useReactToPrint({
    content: () => qrCodeComponentRef.current,
    pageStyle:
      "@page { size: auto; margin: 0; } @media print { body { -webkit-print-color-adjust: exact; padding: 10mm; } }",
    documentTitle: "QR Code PDF",
    onAfterPrint: () => {
      // Generate PDF after printing
      const pdf = new jsPDF();
      const qrCodeComponent = qrCodeComponentRef.current;
      const canvas = qrCodeComponent.querySelector("canvas");
      // Check if the canvas is available
      if (canvas) {
        // Wait for the next tick to ensure canvas is fully rendered
        setTimeout(() => {
          const imageData = canvas.toDataURL("image/png");
          pdf.addImage(imageData, "PNG", 0, 0);
          pdf.save("qrcode.pdf");
        });
      } else {
        console.error("Canvas not found");
      }
    },
  });

  return (
    
    <div ref={qrCodeComponentRef}>
      <div
        style={{
          height: "auto",
          margin: "0 auto",
          maxWidth: 256,
          width: "100%",
        }}
      >
        <QRCode
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={qrCodeValue}
          // Note: You might need to adjust this viewBox based on the size of the QR code
          viewBox={`0 0 256 256`}
        />
      </div>
      <button onClick={handleDownloadPDF}>Download as PDF</button>
    </div>

  );
};

export default QrCodeGenerate;
