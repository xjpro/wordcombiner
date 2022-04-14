import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [combinations, setCombinations] = useState([]);

  function combine(event) {
    event.preventDefault();
    const words = text.split(/\s/g);
    setCombinations(words);
  }

  return (
    <div>
      <form onSubmit={combine}>
        <div className="form-group">
          <label>Words</label>
          <textarea className="form-control" value={text} onChange={(event) => setText(event.target.value)} />
        </div>

        <button className="btn btn-success">Combine</button>
      </form>

      <h2>Results</h2>
      <div>
        {combinations.map((combination) => (
          <div>{combination}</div>
        ))}
      </div>
    </div>
  );
}
