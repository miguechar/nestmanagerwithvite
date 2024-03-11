import { useEffect, useState } from "react";
import { OCR } from "./OCR";

export const TestingPage = () => {
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);

  

  return (
    <div className="input-container-1column">
      <div>
        <OCR />
      </div>
      
    </div>
  );
};
