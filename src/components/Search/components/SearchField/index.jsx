import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchField() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (search.trim() !== "") {
      navigate(`/search?name=${search}`);
    }
  };
  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div className="container">
      <div className="row align-items-center mt-4">
        <div className="col col-md-8 col-lg-10 col-sm-6">
          <input
            type="text"
            className="form-control shadow fs-5 py-2"
            placeholder="Search for items.."
            value={search}
            onChange={handleInputChange}
            onKeyPress={(e) => {
              if (e.key == "Enter") {
                handleSearch();
              }
            }}
          />
        </div>
        <div className="col">
          <button
            onClick={handleSearch}
            className="btn bg-danger text-light px-4 py-2 shadow fs-5"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
