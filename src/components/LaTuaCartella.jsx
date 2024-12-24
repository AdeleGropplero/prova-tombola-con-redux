import { useState } from "react";
import TombolaCard from "./GeneratoreCartelle";
import { useSelector } from "react-redux";

const LaTuaCartella = () => {
  const extracted = useSelector((state) => state.cells.extracted);
  const [cartelle, setCartelle] = useState([]);

  const aggiungiCartella = () => {
    if (cartelle.length < 4) {
      setCartelle([...cartelle, <TombolaCard key={cartelle.length} />]);
    }
  };

  return (
    <>
      <div className=" sfondo pt-5">
        <div className="estratti mx-5">
          {extracted.map((num, index) => (
            <div key={index} className="badge m-1">
              {num}
            </div>
          ))}
        </div>
        <div className="d-flex justify-content-center flex-wrap">
          <button onClick={aggiungiCartella} className="mb-3 newCartella">
            +
          </button>
          {cartelle}
        </div>
      </div>
    </>
  );
};

export default LaTuaCartella;
