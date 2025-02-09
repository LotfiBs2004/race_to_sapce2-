"use client";  // 👈 Add this line

import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "react";

function QRScanner() {
    useEffect(() => {
        const scanner = new Html5QrcodeScanner(
            "reader",
            { fps: 10, qrbox: { width: 250, height: 250 } }
        );

        scanner.render(
            async (decodedText) => {
                console.log("QR Code Scanned:", decodedText);
                
                // Send the scanned data to the backend for check-in
                const response = await fetch("/api/checkin", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ qrData: decodedText })
                });

                const result = await response.json();
                alert(result.message);
            },
            (errorMessage) => {
                console.error("QR Scan Error:", errorMessage);
            }
        );

        return () => scanner.clear();
    }, []);

    return <div id="reader"></div>;
}

export default QRScanner;
