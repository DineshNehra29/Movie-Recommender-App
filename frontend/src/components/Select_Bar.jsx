import "./SelectBar.css";
import { SearchOption } from "./Search_Option";

export const SelectBar = ({ results ,setMovie}) => {
  return (
    <div className="results-list">
      {results.map((result, id) => {
        return <SearchOption result={result} key={id} setMovie={setMovie}/>;
      })}
    </div>
  );
};