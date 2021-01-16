function Test1(props) {
    const {nominates, UpdateNominates} = props
  
    const [name, setName] = useLocalStorage('name', 'bob');
    console.log('this is the nominates in testing',nominates)
  
    return (
      <div className='myInput'> 
      <div>{name}</div>
  
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>
    );
  }
  
  function useLocalStorage(key, initialValue) {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = React.useState(() => {
      try {
        // Get from local storage by key
        const item = window.localStorage.getItem(key);
        // Parse stored json or if none return initialValue
        console.log(item)
        return item ? JSON.parse(item) : initialValue;
      } 
      catch (error) {
        // If error also return initialValue
        console.log(initialValue)
        console.log(error);
        return initialValue;
      }
    });
  
    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    function setValue(value) {
      try{
        const valueToStore = value instanceof Function ? value(storedValue):value;
        setStoredValue(valueToStore)
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
      catch (error) {
        console.log(error)
      }
    }
    return [storedValue, setValue];
  }
  