import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { components } from 'react-select';
import AsyncSelect from 'react-select/async';
import Test from './Test';


const token = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvZXJwLmNsb29kby5jb21cL2FwaVwvdjFcL2F1dGhcL2xvZ2luIiwiaWF0IjoxNjY0NTI4NTg0LCJleHAiOjE2OTYwNjQ1ODQsIm5iZiI6MTY2NDUyODU4NCwianRpIjoiVWZyYjVnN3hzSmxoemgzVCIsInN1YiI6NSwicHJ2IjoiODE4ZjVjOThhY2UyMzc1MzJkOWQ0OTQzZmQ4ZWZiNTQwYjg1NWI0MiIsInJlbWVtYmVyIjoxLCJ0eXBlIjoxfQ.-mzP45W4jepaelTWpTW4GLM9irERE0-9Wt2g54Vugzc"


function App() {
  const [inputValue, setValue] = useState('');
  const [selectedValue, setSelectedValue] = useState(null);
  const [page, setPage] = useState(1);
  const [options, setOptions] = useState([]);

  const url = `https://api.github.com/search/users?q=John&per_page=5&page=${page}`;

  useEffect(() => {
    const getData = async () => {
      var arr = [...options];
      await axios.get(url).then((res) => {
        let result = res.data.items;
        // console.log(result, "result");
        result.map((user) => {
          return arr.push({ value: user.login, label: user.login });
        });
        setOptions(arr);
        // console.log(options);
      });
    };
    getData();
  }, [page]);

  const handleInputChange = value => {
    setValue(value);
    // debounced(value, 1000)
  };

  const handleChange = value => {
    setSelectedValue(value);
  }

  const loadOptions = (inputValue) => {
    return axios({
      method: 'get',
      url: `https://erp.cloodo.com/api/v1/client-search?limit=10&search=${inputValue}`,
      headers: {
        Authorization:
          token
      }
    }).then(function (response) {
      console.log(response.data, "response");
      return response.data.data
    })
  };
  // const debounced = React.useCallback(debounce(loadOptions, 500), []);

  const SelectMenuButton = (props) => {
    return (
      <components.MenuList  {...props}>
        {props.children}
        <button onClick={() => addnewOption()}>Add new element</button>
      </components.MenuList >
    )
  }

  const addnewOption = () => {
    setPage(page + 1)
  }

  return (
    <div className="App">
      <pre>Input Value: "{inputValue}"</pre>
      <AsyncSelect
        components={{ MenuList: SelectMenuButton }}
        noOptionsMessage={() => "name not found"}
        // cacheOptions
        defaultOptions={options}
        value={selectedValue}
        getOptionLabel={e => e.name}
        getOptionValue={e => e.id}
        loadOptions={loadOptions}
        onInputChange={handleInputChange}
        onChange={handleChange}
        placeholder="Select id"
      />
      <pre>Selected Value: {JSON.stringify(selectedValue || {}, null, 2)}</pre>
      <Test />
    </div>
  );
}

export default App;