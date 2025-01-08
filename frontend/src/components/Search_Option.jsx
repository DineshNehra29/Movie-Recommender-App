import "./SearchOption.css";

export const SearchOption = ({ result ,setMovie}) => {
  return (
    <div
      className="search-result"
      onClick={() => setMovie(result)}
    >
      {result}
    </div>
  );
};