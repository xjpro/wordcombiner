import { useState } from "react";
import { compact, first, includes, last, sample, take, times, uniq, without } from "lodash";

export default function Home() {
  const [text, setText] = useState("");
  const [maxLength, setMaxLength] = useState(20);
  const [rejections, setRejections] = useState([]);
  const [activeCombinations, setActiveCombinations] = useState([]);
  const [selections, setSelections] = useState([]);

  function combine(event) {
    event.preventDefault();

    // Move active combinations to rejections
    setRejections((rejections) => [...rejections, ...activeCombinations]);

    const words = uniq(compact(text.split(/\s/g)));
    const numberMaxLength = parseInt(maxLength);

    const newCombinations = uniq(
      compact(
        times(500, () => {
          const start = sample(words).toLowerCase();
          const end = sample(words).toLowerCase();

          if (start === end) return null;
          if (last(start) === first(end)) return null;

          const combination = start + end;

          if (includes(selections, combination)) return null;
          if (includes(activeCombinations, combination)) return null;
          if (includes(rejections, combination)) return null;
          if (combination.length > numberMaxLength) return null;

          return combination;
        })
      )
    );

    setActiveCombinations(take(newCombinations, 48));
  }

  function addSelection(combination) {
    setSelections((selections) => [...selections, combination]);
    setActiveCombinations((combinations) => without(combinations, combination)); // remove from active list
  }

  function clear() {
    setRejections((rejections) => [...rejections, ...selections]); // add all existing selections to rejections list
    setSelections([]);
  }

  return (
    <div>
      <div className="row vh-100">
        <div className="col">
          <form className="mb-3" onSubmit={combine}>
            <div className="form-group">
              <label>Words</label>
              <textarea className="form-control" value={text} onChange={(event) => setText(event.target.value)} />
            </div>

            <div className="d-flex">
              <div className="flex-fill">
                <div className="form-group">
                  <input
                    type="number"
                    className="form-control"
                    value={maxLength}
                    onChange={(event) => setMaxLength(event.target.value)}
                  />
                </div>
              </div>

              <div className="">
                <button className="btn btn-success">Combine</button>
              </div>
            </div>
          </form>

          <div className="row row-cols-2 row-cols-md-6 g-1">
            {activeCombinations.map((combination) => (
              <div className="col">
                <div className="card card-body" onClick={() => addSelection(combination)}>
                  {combination}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-2 h-100">
          <h3>Selections</h3>
          <textarea className="form-control" rows="20" value={selections.join("\n")} />
          <div>
            <button className="btn btn-default" onClick={clear}>
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
