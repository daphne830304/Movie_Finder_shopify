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
        localStorage.setItem('myValueInLocalStorage', JSON.stringify(remaingnominates));
        const updated_nominates = JSON.parse(localStorage.getItem('myValueInLocalStorage'))
        UpdateNominates(updated_nominates)
        // UpdateNominates(remaingnominates)

        
    }
    return (
        <table>
          {!nominates ? <tr>you have no nominates</tr> : nominates.map( (row,i) => <Nominates key={i} title={row} denominate={denominate}></Nominates>)}
        </table>
    )
}

function MovieDetails(props){
  const location = ReactRouterDOM.useLocation();
  const params  = location.state.params
  const { id } = ReactRouterDOM.useParams();
  console.log('this is test1')
  return (<div className='myInput'>
          Movie Name: {params.Title}
          Movie Year: {params.Year}
          <button>back to search result</button>
          <img src={params.Poster}></img></div>)
}

function MoviePoster(props) {
  const {poster, updatePoster} = props
  const {searchTerm, updateSearchTerm} = props

  return(<div>
    <img src= {poster}></img>
   
  </div>)
}
function Movies (props) {
    const [clicked, Updateclicked] = React.useState(false)
    let history = ReactRouterDOM.useHistory()

    return (
      <React.Fragment>
        <tr>
          <td>{props.Title}</td>
          <td>({props.Year})</td>

          <button onClick={()=>history.push(`/movies/${props.id}`, 
                                            {params:{'Title':props.Title,'Year':props.Year,'imbdID':props.imdbID,'Poster':props.Poster}})}>
          click to see details</button>
          <button onClick={()=> props.addposter(props.Poster)}>click to see poster</button>
          <button id='nominate-id' disabled={clicked} onClick={() => {props.addnominates(props.Title);Updateclicked(true)}}>Nominate</button>
        </tr>
        </React.Fragment>
    )
  }
function MoviesTable(props) {
    const {searchTerm, updateSearchTerm}= props
    const {nominates, UpdateNominates} = props
    const [moviedata, Updatemoviedata] = React.useState([]);
    const {poster, updatePoster} = props
    
    React.useEffect(() => {
        fetch(`http://www.omdbapi.com/?apikey=6bd6e741&s=${searchTerm}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            console.log('api is hit')
            Updatemoviedata(data.Search)
            updatePoster('')
            // console.log(data.Search)
        })
        },[searchTerm])
    const movie_list = []
    // console.log('rendering movie')

    function addposter(poster) {
      updatePoster(poster)
      console.log(poster)
    }

    function addnominates(title) {
        
        console.log(typeof(nominates))
        localStorage.setItem('myValueInLocalStorage', JSON.stringify(nominates.concat(title)));
        const updated_nominates = JSON.parse(localStorage.getItem('myValueInLocalStorage'))
        UpdateNominates(updated_nominates)
        // console.log('this is hte list of the',nominates)
        // console.log('this is hte list of the',updated_nominates)
        // console.log(typeof(updated_nominates))
        // console.log(typeof(nominates)

    }
    
    if (moviedata) {
        for (const movie of moviedata) {
            movie_list.push(
            <Movies key={movie.imdbID}
                    Title={movie.Title}
                    Year={movie.Year}
                    id={movie.imdbID}
                    Poster={movie.Poster}
                    addposter={addposter}
                    addnominates={addnominates}></Movies>)
        }
    }
    // console.log(movie_list)
    
    return (
      <React.Fragment>
          <table>
            {movie_list}
            </table>
      </React.Fragment>
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
let initialNominates = JSON.parse(localStorage.getItem('myValueInLocalStorage'))
  
  if (!initialNominates) {
    localStorage.setItem('myValueInLocalStorage', JSON.stringify([]));
    initialNominates = JSON.parse(localStorage.getItem('myValueInLocalStorage'))
  }
  
  
  console.log(initialNominates)
function AllComponents () {
  
  

  const [searchTerm, updateSearchTerm] = React.useState('');
  const [nominates, UpdateNominates] = React.useState(initialNominates)
  const [history, UpdateHistory] = React.useState([])
  const [poster,updatePoster] = React.useState('')


    return (
        <React.Fragment>
        <div className="myInput">
            <SearchBar searchTerm={searchTerm} updateSearchTerm={updateSearchTerm}>
            </SearchBar>
            Movie Table
            <MoviesTable searchTerm={searchTerm} 
                          nominates={nominates} 
                          UpdateNominates={UpdateNominates}
                          poster={poster}
                          updatePoster={updatePoster}>
            </MoviesTable>
        </div>
        <div className="myInput">
          Nominates Table
            <NominatesTable nominates={nominates} UpdateNominates={UpdateNominates}>
         </NominatesTable>
         </div>
         <div>
         <MoviePoster poster={poster} updatePoster={updatePoster}></MoviePoster>
         </div>
    
         
         </React.Fragment>
    )
  
    }
  
  
 function IndexPage(){
   let history = ReactRouterDOM.useHistory()
   return (
     <div>
       <button className='myInput' onClick={()=>(history.push('/movies'))}>Click to enter</button>
     </div>
   )
 }
  
function Test() {
  
  function clickCounter() {
    if (typeof(Storage) !== "undefined") {
      if (localStorage.clickcount) {
        localStorage.clickcount = Number(localStorage.clickcount)+1;
      } else {
        localStorage.clickcount = 1;
      }
      document.getElementById("result").innerHTML = "You have clicked the button " + localStorage.clickcount + " time(s).";
    } else {
      document.getElementById("result").innerHTML = "Sorry, your browser does not support web storage...";
    }
  }
  return (
  <div className='myInput'>
    <div id="result">results</div>
    <button onClick={()=>clickCounter()}>Click me!</button>
    <p>Click the button to see the counter increase.</p>
    <p>Close the browser tab (or window), and try again, and the counter will continue to count (is not reset).</p>
  </div>)
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
          <ReactRouterDOM.Route path="/" exact >
                <IndexPage/>
              </ReactRouterDOM.Route>
          <ReactRouterDOM.Route path="/movies/:id" >
                <MovieDetails/>
              </ReactRouterDOM.Route>
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