import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setCells } from "../redux/actions/actions";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Cells = () => {
  const dispatch = useDispatch();
  const [cells, setCellsState] = useState([]);
  const extracted = useSelector((state) => state.cells.extracted);

  useEffect(() => {
    const generatedCells = Array.from({ length: 90 }, (_, i) => i + 1); // Genera i dati (si poteva usare anche un ciclo for)
    setCellsState(generatedCells); // Aggiorna lo stato locale (aggiunto State per evitare ambiguità con acrion)
    dispatch(setCells(generatedCells)); // Dispatch a Redux
  }, [dispatch]); // Dipendenze corrette per useEffect

  return (
    <>
      <Container>
        <h1 className="title mt-3">
          La Tombola di Adi{" "}
          <span>
            <Link to="/generatoreCartelle">
              Genera qui la tua cartella e inizia a giocare!
            </Link>
          </span>
        </h1>

        {cells.map((num) => (
          <button
            className={`cell ${extracted.includes(num) ? "extracted" : ""}`}
            key={num}
          >
            {num}
          </button>
        ))}
      </Container>
    </>
  );
};
export default Cells;
