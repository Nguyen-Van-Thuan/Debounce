import * as React from "react";
import axios from "axios";
import { debounce } from "lodash";

const Test = () => {
  const [photos, setPhotos] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");

  async function fetchData(searchTerm) {
    const data = await axios.get(
      `https://jsonplaceholder.typicode.com/photos?title_like=${searchTerm}`
    );
    // console.log(data.data);
    setPhotos(data.data);
  }
  const debounced = React.useCallback(debounce(fetchData, 500), []);

  React.useEffect(() => {
    fetchData("");
  }, []);
  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          debounced(e.target.value, 1000);
        }}
      />
      <div>
        {photos?.map((photo) => (
          <div key={photo.id}>{JSON.stringify(photo.title)}</div>
        ))}
      </div>
    </div>
  )
}

export default Test