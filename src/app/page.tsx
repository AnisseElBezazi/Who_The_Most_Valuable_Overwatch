"use client";

import { useState } from "react";

export default function Home() {
  const [player1Input, setPlayer1Input] = useState("");
  const [player2Input, setPlayer2Input] = useState("");
  const [results, setResults] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!player1Input || !player2Input) return;

    const tag1 = player1Input.replace("#", "-");
    const tag2 = player2Input.replace("#", "-");

    try {
      const [res1, res2] = await Promise.all([
        fetch(`/api/player/${tag1}`),
        fetch(`/api/player/${tag2}`),
      ]);

      const data1 = await res1.json();
      const data2 = await res2.json();

      setResults({ player1: data1, player2: data2 });
    } catch (err: any) {
      setResults({ error: err.message });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={player1Input}
          onChange={(e) => setPlayer1Input(e.target.value)}
          placeholder="Player 1"
        />
        <input
          type="text"
          value={player2Input}
          onChange={(e) => setPlayer2Input(e.target.value)}
          placeholder="Player 2"
        />
        <button type="submit">Compare</button>
      </form>

      {results && <pre>{JSON.stringify(results, null, 2)}</pre>}
    </div>
  );
}
