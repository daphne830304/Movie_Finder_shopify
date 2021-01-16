//MovieTableSearchandNominate {
  //search bar
  //movie table
    //movie rows  
  //nominate table
//}


function MovieTable (props) {
  return (
    <React.Fragment>
      <tr>
        <td>{props.Title}</td>
        <td>{props.Year}</td>
        <button id='nominate-id' onClick={() => props.Addrow(props.Title)}>Nominate</button>
      </tr>
      </React.Fragment>
  )
}


function NominatedTable (props){
  const [rows, updateRows] = React.useState([])
  // const {rows, updateRows} = props
  function addrowfunction() {
    // updateRows(rows.concat('rows'))
    console.log('this is inside the nominate Table')}
  return (
    <React.Fragment>
       <table>
        <button id='tables-id' onClick={addrowfunction}>click to add row</button>
        {rows.map(row => <tr>{row}</tr>)}
        </table>
      </React.Fragment>
  )
}


function AllComponents () {
      function SearchBox(props) {
        
        const [showResult, updateshowResult] = React.useState({'clicked':false});
        const [searchTerm, updateSearchTerm] = React.useState();
        const [rows, updateRows] = React.useState([])

      function handleClick() {
        // console.log(showResult)
        updateshowResult({'clicked':true})
        // console.log(showResult)
      }

      function resetClick(){
        updateshowResult({'clicked':false})
        updateSearchTerm('')
        updateRows([])
      }
      function Addrow(value) {
        console.log(value)
        console.log('addingrows')
        updateRows(rows.concat(value))
        console.log(rows)
      }

      function FindMovie(props) {
        
        const [moviedata, Updatemoviedata] = React.useState([]);
        React.useEffect(() => {
          fetch(`http://www.omdbapi.com/?apikey=6bd6e741&s=${props.searchTerm}`)
          .then(res => res.json())
            .then(data => {
              Updatemoviedata(data.Search) 
              console.log(data.Search)})
            },[])
        const movie_list = []
        if (moviedata){
        for (const movie of moviedata) {
          movie_list.push( 
            <MovieTable key={movie.imdbID}
                        Title={movie.Title}
                        Year={movie.Year}
                        Addrow={Addrow}></MovieTable>)}
        }
         
        return (
          <table>
            {movie_list}
          </table>
        )
      }
        return (
          <div id="myInput">
          {searchTerm ? 
              <FindMovie searchTerm={searchTerm}/> : null }
              {/* <FindMovie searchTerm={searchTerm}/>  */}
          {rows.map(row => <tr>{row}</tr>)}
          </div>

          )
      }
    
      return (
        <React.Fragment>
           <input  type="text"  value={searchTerm} onChange={evt=>updateSearchTerm(evt.target.value)}placeholder="Search for Movie..."></input>
          <button className="findonmap-button" onClick={handleClick}>submit</button>
          <button className="findonmap-button" onClick={resetClick}>reset</button>
          <SearchBox></SearchBox>
        </React.Fragment>
      )
}



const AuthContext = React.createContext(null);
function App() {
  
  const [loggedIn, setLoggedIn] = React.useState(null);

  const VARIANTS = {
    true: 'success',
    false: 'danger'
  };

  React.useEffect(() => {
    fetch('/api/check_session')
      .then(res => res.json())
      .then(data => {
        setLoggedIn(data.session) 
        // console.log(data.session)
        // console.log(loggedIn)
      })
  }, [loggedIn]);

  const NavLinks = {
    true: (

        <ReactBootstrap.Navbar id='homepage-nav-bar' className='navbarcolor' fixed="top" variant="light">
          <ReactBootstrap.Navbar.Brand className='home-navbarlink' href="/">HOME</ReactBootstrap.Navbar.Brand>
          <ReactBootstrap.Nav >
            <ReactBootstrap.Nav.Link >
              <ReactRouterDOM.Link className='navbarlink' to='/movies'>FILMS
            </ReactRouterDOM.Link>
            </ReactBootstrap.Nav.Link>
            <ReactBootstrap.Nav.Link >
              <ReactRouterDOM.Link className='navbarlink' to='/tables'>tables
            </ReactRouterDOM.Link>
            </ReactBootstrap.Nav.Link>
          </ReactBootstrap.Nav>
         
        </ReactBootstrap.Navbar>
    ),

    false: (
      <div id='homepage-login' class='h1-homepage'>
        <ReactBootstrap.Navbar id='homepage-nav-bar' className='navbarcolor' fixed="top" variant="light">
          <ReactBootstrap.Navbar.Brand className='home-navbarlink' href="/">HOME
        </ReactBootstrap.Navbar.Brand>
          <ReactBootstrap.Nav >
          <ReactBootstrap.Nav.Link >
              <ReactRouterDOM.Link className='navbarlink' to='/movies'>FILMS
            </ReactRouterDOM.Link>
            </ReactBootstrap.Nav.Link>
            <ReactBootstrap.Nav.Link >
              <ReactRouterDOM.Link className='navbarlink' to='/tables'>tables
            </ReactRouterDOM.Link>
            </ReactBootstrap.Nav.Link>
          </ReactBootstrap.Nav>

        </ReactBootstrap.Navbar>
      </div>

    )
  };
  return (
    <AuthContext.Provider value={{loggedIn, setLoggedIn}}>

      <ReactRouterDOM.BrowserRouter>
        
        {NavLinks[loggedIn]}
        
        <ReactRouterDOM.Switch>
          <ReactRouterDOM.Route path='/movies'>
            <AllComponents />
          </ReactRouterDOM.Route>
          <ReactRouterDOM.Route path='/tables'>
          <NominatedTable/>
          </ReactRouterDOM.Route>
        </ReactRouterDOM.Switch>
      
      </ReactRouterDOM.BrowserRouter>
 


  </AuthContext.Provider>
   
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root'))


    //react async issue-- fixed by adding a conditional in the TestMap component 

