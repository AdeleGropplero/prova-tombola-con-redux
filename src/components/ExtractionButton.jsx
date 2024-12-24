import { useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setExtracted } from "../redux/actions/actions";

const ExtractionButton = () => {
  const dispatch = useDispatch();
  const cells = useSelector((state) => state.cells.content);
  /* const initialNumbers = cells; */

  const initialNumbers =
    cells.length > 0
      ? cells
      : Array.from({ length: 90 }, (_, index) => index + 1);

  const [remainingNumbers, setRemainingNumbers] = useState(initialNumbers);

  // Stato che conterrà i numeri estratti
  const [extracted, setExtractedState] = useState([]);
  console.log("Extracted Numbers", extracted);

  const handleBtn = (e) => {
    e.preventDefault();

    if (remainingNumbers.length === 0) {
      alert("Tutti i numeri sono stati estratti!");
      return;
    }

    // Estrai un numero casuale dall'array remainingNumbers
    const randomIndex = Math.floor(Math.random() * remainingNumbers.length);
    const casualNum = remainingNumbers[randomIndex];

    // Rimuovi il numero estratto dall'array remainingNumbers
    const newRemainingNumbers = remainingNumbers.filter(
      (num) => num !== casualNum
    );

    // Aggiungi il numero estratto all'array degli estratti
    setExtractedState((prevExtracted) => {
      const updatedExtracted = [...prevExtracted, casualNum];
      dispatch(setExtracted(updatedExtracted)); // Passa l'array aggiornato direttamente al Redux
      return updatedExtracted;
    });

    setRemainingNumbers(newRemainingNumbers); // Aggiorna l'array dei numeri rimanenti
  };

  return (
    <Container className="d-flex flex-column align-items-center mt-3 mb-5">
      <button onClick={handleBtn} className="extractionBtn mb-3">
        ESTRAI!!
      </button>
      <div>
        {extracted.map((num, index) => (
          <span key={index} className="badge  m-1">
            {num}
          </span>
        ))}
      </div>
    </Container>
  );
};

export default ExtractionButton;
