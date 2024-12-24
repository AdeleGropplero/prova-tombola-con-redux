import { useMemo, useState } from "react";
import { useSelector } from "react-redux";

const generateTombolaCard = () => {
  // Step 1: Genera numeri per ogni colonna con intervalli corretti
  const columns = Array.from({ length: 9 }, (_, colIndex) => {
    const start = colIndex === 0 ? 1 : colIndex * 10; // Prima colonna da 1, altre da 10, 20...
    const end =
      colIndex === 0
        ? start + 8 // Caso speciale per la prima colonna (1-9)
        : colIndex === 8
        ? 90 // Caso speciale per l'ultima colonna (80-90)
        : start + 9; // Tutte le altre colonne

    /* DOPO VARI TENTATIVI HO CREATO UN TERNARIO DENTRO UN TERNARIO PER COPRIRE I 3 CASI DIFFERENTI */

    /*     const end = start + (colIndex === 0 ? 8 : 9); // La prima colonna termina a 9, le altre coprono esattamente 10 numeri */
    /*  const end = colIndex === 8 ? 90 : start + 9; // Fine intervallo per l'ultima colonna (90) e 10 per le altre */
    const numbers = Array.from(
      { length: end - start + 1 },
      (_, i) => start + i
    );
    return numbers.sort(() => Math.random() - 0.5); // Mescola numeri, creando un array di 10 numeri( nel primo caso 9 e nell'ultimo 11)
    // organizzati in maniera casuale [3, 5, 9, 1, 2, 7, 8, 6, 4] così da selezionarne 5 random.
  });

  // Step 2: Inizializza una matrice vuota con 3 righe e 9 colonne
  const card = Array.from({ length: 3 }, () => Array(9).fill(null));
  /* 
  IL RISULTATO SARà UN ARRAY DI ARRAY (BIDIMENSIONALE) COSì STRUTTURATO
 [
  [null, null, null, null, null, null, null, null, null], // Prima riga
  [null, null, null, null, null, null, null, null, null], // Seconda riga
  [null, null, null, null, null, null, null, null, null]  // Terza riga
 ]
 */

  // Step 3: Posiziona i numeri in ogni colonna
  columns.forEach((colNumbers, colIndex) => {
    // Prendi massimo 3 numeri per colonna
    const selectedNumbers = colNumbers.slice(0, 3);

    // Posiziona i numeri casualmente nelle 3 righe
    const rowIndexes = [0, 1, 2].sort(() => Math.random() - 0.5);
    selectedNumbers.forEach((num, i) => {
      card[rowIndexes[i]][colIndex] = num;
    });
  });

  //--------------------------------------------------------------------------------------------------------------
  //                SPIEGAZIONE STEP 3
  //--------------------------------------------------------------------------------------------------------------

  /* Il significato di card[rowIndexes[i]][colIndex] = num

Questa istruzione è la parte centrale del processo di distribuzione dei numeri nella cartella di tombola. In pratica, sta dicendo:

    1. Vai nell'array card (la matrice che rappresenta la cartella di tombola).
    2. Accedi alla riga rowIndexes[i] (che è l'indice della riga casuale dove metterai il numero).
    3. Accedi alla colonna colIndex (dove il numero deve essere posizionato, che è la colonna specifica della cartella).
    4. Assegna il valore num (il numero da posizionare) alla cella corrispondente nella matrice.

Un esempio pratico:

Immagina che rowIndexes = [1, 0, 2] e che stiamo lavorando sulla colonna 2 (quindi colIndex = 2), 
e i numeri selezionati per questa colonna sono [15, 21, 25] (quindi num sarà rispettivamente 15, 21 e 25).

    Per il primo numero (15), rowIndexes[0] = 1 e colIndex = 2. Quindi, card[1][2] = 15 posiziona il numero 15 nella seconda riga, terza colonna.
    Per il secondo numero (21), rowIndexes[1] = 0 e colIndex = 2. Quindi, card[0][2] = 21 posiziona il numero 21 nella prima riga, terza colonna.
    Per il terzo numero (25), rowIndexes[2] = 2 e colIndex = 2. Quindi, card[2][2] = 25 posiziona il numero 25 nella terza riga, terza colonna. 

    FATTO COSì:  
 [
  [null, null, 21, null, null, null, null, null, null],  // Prima riga
  [null, null, 15, null, null, null, null, null, null],  // Seconda riga
  [null, null, 25, null, null, null, null, null, null]   // Terza riga
 ]
  */

  //--------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------

  // Step 4: Assicurati che ogni riga abbia esattamente 5 numeri
  card.forEach((row) => {
    // Calcola quanti spazi vuoti servono (9 colonne - 5 numeri = 4 spazi vuoti)
    const filledIndexes = row
      .map((cell, index) => (cell !== null ? index : null))
      .filter((index) => index !== null);

    // Rimuovi numeri casuali finché non rimangono 5 numeri
    while (filledIndexes.length > 5) {
      const randomIndex = Math.floor(Math.random() * filledIndexes.length);
      const colToRemove = filledIndexes.splice(randomIndex, 1)[0];
      row[colToRemove] = null; // Sostituisci il numero con un valore vuoto
    }
  });

  return card;
};

//--------------------------------------------------------------------------------------------------------------
//                SPIEGAZIONE STEP 4
//--------------------------------------------------------------------------------------------------------------

/* In questo step, il codice si occupa di assicurarsi che ogni riga della cartella contenga esattamente 5 numeri. 
  Poiché inizialmente ogni riga ha 9 celle (di cui alcune potrebbero essere riempite con numeri), 
  è necessario rimuovere alcuni numeri per rispettare la regola del gioco.

    Identificazione delle celle piene:
        row.map((cell, index) => (cell !== null ? index : null)) crea un array di indici delle celle che contengono un numero 
        (ossia quelle celle che non sono null). Se la cella è vuota (null), l'indice sarà null; 
        altrimenti, verrà restituito l'indice della colonna.
        .filter((index) => index !== null) rimuove gli indici null dall'array, lasciando solo gli indici delle celle piene.

    Controllo e rimozione dei numeri in eccesso:
        while (filledIndexes.length > 5) verifica se il numero di celle piene è maggiore di 5. 
        Se sì, significa che ci sono troppi numeri nella riga, quindi alcuni devono essere rimossi.
        const randomIndex = Math.floor(Math.random() * filledIndexes.length) genera un indice casuale per una delle celle piene.
        const colToRemove = filledIndexes.splice(randomIndex, 1)[0] rimuove l'indice selezionato casualmente dall'array filledIndexes. 
        Questo indica quale colonna deve essere svuotata.
        row[colToRemove] = null imposta la cella corrispondente a null, rimuovendo il numero dalla riga.

    Ripetizione finché ci sono più di 5 numeri:
        Il ciclo while continua finché il numero di celle piene è maggiore di 5, 
        rimuovendo numeri casuali fino a quando ogni riga non contiene esattamente 5 numeri. */

//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------

const TombolaCard = () => {
  const extracted = useSelector((state) => state.cells.extracted);
  const [clickedCells, setClickedCells] = useState([]); // Stato per le celle cliccate

  const card = useMemo(() => generateTombolaCard(), []);

  const handleCellClick = (e, cell) => {
    e.preventDefault();
    if (!cell) return; // Ignora celle vuote

    if (extracted.includes(cell)) {
      // Se il numero è estratto, aggiungi il className "tac"
      setClickedCells((prevClickedCells) => [...prevClickedCells, cell]);
    } else {
      alert(`Il numero ${cell} non è stato ancora estratto.`);
    }
  };

  return (
    <div
      className="tombola-card"
      style={{ textAlign: "center", margin: "20px" }}
    >
      <table
        style={{
          borderCollapse: "collapse",
          margin: "auto",
          fontFamily: "Arial, sans-serif"
        }}
      >
        <tbody>
          {card.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td
                  key={colIndex}
                  className={`${cell ? "withNumber" : "noNumber"} cartella `}
                  onClick={(e) => handleCellClick(e, cell)}
                >
                  <div
                    className={`${clickedCells.includes(cell) ? "sorted" : ""}`}
                  >
                    {cell || ""}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TombolaCard;
