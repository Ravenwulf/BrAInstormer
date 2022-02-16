import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ animal: animalInput }),
    });
    const data = await response.json();
    setResult(data.result);
    setAnimalInput("");
  }

  return (
    <div>
      <Head>
        <title>BrAInstormer</title>
        <link rel="icon" href="/cog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/Brainstorm.png" className={styles.icon} />
        <h3>BrAInstormer</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            placeholder='Optional modifier...'
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
          />
          <input type="submit" value="Generate problems" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
