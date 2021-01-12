function Nominates(props) {
    return (
        <React.Fragment>
        <tr>
            <td>{props.title}</td>
            <button  onClick={() => props.denominate(props.title)}>Denominate</button>
        </tr>
        
        </React.Fragment>
    )
}

function NominatesTable(props) {
    const {nominates, UpdateNominates} = props

    function denominate(value) {
        const remaingnominates = nominates.filter(nominate => nominate != value)
        UpdateNominates(remaingnominates)
    }
    return (
        <table>
            {nominates.map( (row,i) => <Nominates key={i} title={row} denominate={denominate}></Nominates>)}
        </table>
    )
}
function Movies (props) {
    const [clicked, Updateclicked] = React.useState(false)
    return (
      <React.Fragment>
        <tr>
          <td>{props.Title}</td>
          <td>({props.Year})</td>
          <button id='nominate-id' disabled={clicked} onClick={() => {props.addnominates(props.Title);Updateclicked(true)}}>Nominate</button>
        </tr>
        </React.Fragment>
    )
  }
function MoviesTable(props) {
    const {searchTerm, updateSearchTerm}= props
    const {nominates, UpdateNominates} = props

    const [moviedata, Updatemoviedata] = React.useState([]);
    
    React.useEffect(() => {
        fetch(`http://www.omdbapi.com/?apikey=6bd6e741&s=${searchTerm}`)
        .then(res => res.json())
        .then(data => {
            console.log('api is hit')
            Updatemoviedata(data.Search) 
            // console.log(data.Search)
        })
        },[searchTerm])
    const movie_list = []
    // console.log('rendering movie')

    function addnominates(title) {
        UpdateNominates(nominates.concat(title))
        console.log('this is hte list of the',nominates)

    }
    
    if (moviedata) {
        for (const movie of moviedata) {
            movie_list.push(
            <Movies key={movie.imdbID}
                    Title={movie.Title}
                    Year={movie.Year}
                    id={movie.imdbID}
                    addnominates={addnominates}></Movies>)
        }
    }
    // console.log(movie_list)
    
    return (
          <table>
            {movie_list}
            </table>
        )
}
function SearchBar(props){
    const {searchTerm, updateSearchTerm}= props
    // console.log('search bar')
    
    function handlechange(e) {
        updateSearchTerm(e.target.value)
    }

    return (
    <div>
    <input  type="text"  
            value={searchTerm} 
            onChange={handlechange}
            placeholder="Search for Movie..."></input>
            
    </div>)
}
  
function AllComponents () {
    
    const [searchTerm, updateSearchTerm] = React.useState('');
    const [nominates, UpdateNominates] = React.useState([])

    return (
        <React.Fragment>
        <div className="myInput">
            <SearchBar searchTerm={searchTerm} updateSearchTerm={updateSearchTerm}>
            </SearchBar>
            <MoviesTable searchTerm={searchTerm} nominates={nominates} UpdateNominates={UpdateNominates}>
            </MoviesTable>
        </div>
        <div className="myInput">
            <NominatesTable nominates={nominates} UpdateNominates={UpdateNominates}>
         </NominatesTable>
         </div>
         
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
            <AllComponents/>
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
  
  //push vs concat. push returns the new length of the array concat returns a new array