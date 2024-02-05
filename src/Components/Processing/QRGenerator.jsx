// import QRCode from "react-qr-code";

// export const QRCodeGenerator = ({ value }) => {
//   return (
//     <div
//       style={{
//         height: "auto",
//         margin: "0 auto",
//         maxWidth: 250,
//         width: "100%",
//         backgroundColor: "White",
//         padding: "16px",
//       }}>
//       <QRCode
//         size={500}
//         style={{ height: "auto", maxWidth: "100%", width: "100%" }}
//         value={value}
//         viewBox={`0 0 256 256`}
//         title={"value"}
//       />
//     </div>
//   );
// };

import { Button } from '@nextui-org/react';
import React, { useRef } from 'react';
import QRCode from 'react-qr-code';

export const QRCodeGenerator = ({ value }) => {
  const qrRef = useRef();

  const copyToClipboard = async () => {
    const canvas = qrRef.current.querySelector('canvas');
    const image = canvas.toDataURL('image/png');
    const blob = await (await fetch(image)).blob();

    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ]);
      alert('QR Code copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div>
      <div
        ref={qrRef}
        style={{
          height: 'auto',
          margin: '0 auto',
          maxWidth: 250,
          width: '100%',
          backgroundColor: 'White',
          padding: '16px',
        }}>
        <QRCode
          size={500}
          style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
          value={value}
          viewBox={`0 0 256 256`}
          title={'value'}
        />
      </div>
      <Button color='primary' onClick={copyToClipboard}>Copy QR Code</Button>
    </div>
  );
};
