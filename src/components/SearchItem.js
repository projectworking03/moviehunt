import { useNavigate } from "react-router";
import "./SearchItem.css";

const SearchItem = ({
  id,
  image,
  title,
  titleExtension,
  setQuery,
  setDropdown,
}) => {
  const navigate = useNavigate();

  /**** When an option is clicked ****/
  const handleClick = () => {
    // Navigate to the review page with the movie ID
    navigate(`/review/${id}`);

    // Close the dropdown
    setDropdown(false);

    // Populate the input field with selected movie name
    setQuery(title);
  };

  return (
    <div className="searchItem" onClick={handleClick}>
      {/* Thumbnail */}
      <div className="searchItem__thumbnail">
        <img src={image} alt="thumbnail" />
      </div>

      {/* Details */}
      <div className="searchItem__details">
        <h3>
          {title} {titleExtension}
        </h3>
      </div>
    </div>
  );
};

export default SearchItem;
