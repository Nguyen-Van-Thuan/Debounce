import axios from "axios";
import { useEffect, useState } from "react";
import { components } from 'react-select';
import Select from "react-select";


function App() {
  const [options, setOptions] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState();

  const url = `https://api.github.com/search/users?q=John&per_page=5&page=${page}`;

  const addnewOption = () => {
    setPage(page + 1)
  }

  // API
  useEffect(() => {
    const getData = async () => {
      var arr = [...options];
      await axios.get(url).then((res) => {
        let result = res.data.items;
        result.map((user) => {
          return arr.push({ value: user.login, label: user.login });
        });
        setOptions(arr);
        // console.log(options);
      });
    };
    getData();
  }, [page]);


  const SelectMenuButton = (props) => {
    return (
      <components.MenuList  {...props}>
        {props.children}
        <button onClick={() => addnewOption()}>Add new element</button>
      </components.MenuList >
    )
  }

  function handleSelect(data, event) {
    setSelectedOptions(data);
  }

  return (
    <Select
      placeholder="Select an individual"
      options={options}
      noOptionsMessage={() => "name not found"}
      components={{ MenuList: SelectMenuButton }}
      value={selectedOptions}
      onChange={handleSelect}
      isSearchable={true}
    />
  );
}
export default App;