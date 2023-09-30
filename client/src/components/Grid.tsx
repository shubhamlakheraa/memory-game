import { useState, useEffect } from "react";

const Grid = () => {
  const [shuffledAvatars, setshuffledAvatars] = useState<string[]>([]);
  const [isHidden, setIsHidden] = useState<boolean[]>(Array(16).fill(true));

  const [timer, setTimer] = useState(30);
  const [isGameStarted, setIsGameStarted] = useState(false);

  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [score, setScore] = useState<number | string | null>(null);

  const [clickQueue, setClickQueue] = useState<number[]>([]);

  const rows = 4;
  const cols = 4;

  const avatars = [
    "adventurer-neutral",
    "adventurer-neutral",
    "avataaars",
    "avataaars",
    "lorelei",
    "lorelei",
    "open-peeps",
    "open-peeps",
    "pixel-art",
    "pixel-art",
    "miniavs",
    "miniavs",
    "big-ears",
    "bottts",
    "big-ears",
    "bottts",
  ];

  const handleOnClick = (cellIndex: number) => {
    console.log("Clicked cell:", cellIndex);

    // Do nothing if the cell is already revealed or the game has ended
    if (!isGameStarted || !isHidden[cellIndex]) {
      return;
    }

    const updatedHiddenState = [...isHidden];
    updatedHiddenState[cellIndex] = false;
    setIsHidden(updatedHiddenState);

    // Add the cellIndex to the clickQueue
    setClickQueue((queue) => [...queue, cellIndex]);

    // Check for matching pairs
    if (clickQueue.length === 1) {
      const firstIndex = clickQueue[0];
      const secondIndex = cellIndex;

      if (shuffledAvatars[firstIndex] === shuffledAvatars[secondIndex]) {
        // Matched!
        setMatchedPairs(matchedPairs + 1);
        setClickQueue([]); // Clear the click queue
      } else {
        // Not a match, hide the cells after a delay
        setTimeout(() => {
          const resetHiddenState = [...isHidden];
          resetHiddenState[firstIndex] = true;
          resetHiddenState[secondIndex] = true;
          setIsHidden(resetHiddenState);
          setClickQueue([]); // Clear the click queue
        }, 500);
      }
    }
  };

  const startGame = () => {
    setIsGameStarted(true);

    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          clearInterval(interval);
          setIsGameStarted(false);
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  

  const resetGame = () => {
    setIsGameStarted(false);
    setTimer(30);
    setMatchedPairs(0);
    setScore(null);
    setClickQueue([]);

    // Reset the avatars and reshuffle
    // const shuffled = [...avatars];

    // setshuffledAvatars(shuffled);

    // Reset the hidden state
    setIsHidden(Array(16).fill(true));
  };

  const grid = Array.from({ length: rows }, (_, rowIndex) =>
    Array.from({ length: cols }, (_, colIndex) => {
      const cellIndex = rowIndex * cols + colIndex;
      return (
        <div
          onClick={() => handleOnClick(cellIndex)} // Pass the cell index to the click handler
          key={colIndex}
          className={`p-2 border border-gray-500 w-[100px] h-[100px] m-2 cursor-pointer ${
            !isGameStarted ? "pointer-events-none" : ""
          }`}
        >
          <img
            src={`https://api.dicebear.com/7.x/${shuffledAvatars[cellIndex]}/svg`}
            alt="Avatar"
            className={`${isHidden[cellIndex] ? "hidden" : ""}`}
          />
        </div>
      );
    })
  );

  useEffect(() => {
    const shuffled = [...avatars];

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    for (let i = 0; i < shuffled.length - 1; i++) {
      if (shuffled[i] === shuffled[i + 1]) {
        const randomIndex = Math.floor(Math.random() * avatars.length);
        [shuffled[i], avatars[randomIndex]] = [
          avatars[randomIndex],
          shuffled[i],
        ];
      }
    }

    setshuffledAvatars(shuffled);
  }, []);

  useEffect(() => {
    if (matchedPairs === avatars.length / 2) {
      // All pairs have been matched
      setScore(timer);
    } else if (timer === 0) {
      // Timer has run out
      setScore("Time's up!");
    }
  }, [matchedPairs, avatars.length, timer]);

  return (
    <div className="">
      <div className="text-center my-4">
        {score !== null ? (
          <div>
            <p>
              {score === "Time's up!"
                ? "Time's up!"
                : `Your score: ${score === 0 ? "0" : `${score}s left`}`}
            </p>
            <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={resetGame}>Play Again</button>
          </div>
        ) : (
          <button
            onClick={startGame}
            className={`bg-blue-500 text-white py-2 px-4 rounded ${
              isGameStarted ? "pointer-events-none" : ""
            }`}
          >
            {isGameStarted ? `Game in Progress (${timer}s)` : "Start Game"}
          </button>
        )}
        <button className="bg-blue-500 text-white py-2 px-4 m-2 rounded" onClick={resetGame}>Restart Game</button>
      </div>
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center">
          {row}
        </div>
      ))}
    </div>
  );
};

export default Grid;
