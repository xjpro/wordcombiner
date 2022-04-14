import { useState } from "react";
import { compact, first, includes, last, sample, take, times, uniq, without } from "lodash";

export default function Home() {
  const [text, setText] = useState("");
  const [maxLength, setMaxLength] = useState(20);
  const [rejections, setRejections] = useState([]);
  const [combinations, setCombinations] = useState([]);
  const [selections, setSelections] = useState([]);

  function combine(event) {
    event.preventDefault();

    // Set existing in rejections
    setRejections((rejections) => [...rejections, ...combinations]);

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
          if (includes(combinations, combination)) return null;
          if (includes(rejections, combination)) return null;

          if (combination.length > numberMaxLength) return null;

          return combination;
        })
      )
    );

    setCombinations(take(newCombinations, 60));
  }

  function addSelection(selection) {
    setSelections((selections) => [...selections, selection]);
    setCombinations((combinations) => without(combinations, selection));
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
            {combinations.map((combination) => (
              <div className="col">
                <div className="card card-body" onClick={() => addSelection(combination)}>
                  {combination}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-2">
          <h3>Selections</h3>
          <textarea className="form-control h-100" value={selections.join("\n")} />
        </div>
      </div>
    </div>
  );
}
