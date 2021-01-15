const {Table} = ReactBootstrap;

function Nominates(props) {
 

  const {poster, updatePoster} = props

  function handleMouseHoverON() {
    // console.log(onHover)
 
    updatePoster(props.Poster)
  }

  function handleMouseHoverOFF() {
 
    updatePoster('')
  }

    return (
        <React.Fragment>
        <tr onMouseEnter={handleMouseHoverON} onMouseLeave={handleMouseHoverOFF}  >

            <td>{props.title}</td>
            <td><button className='nominates-button' onClick={() => props.denominate(props.title)}>Remove</button></td>
        </tr>
        
        </React.Fragment>
    )
}

function NominatesTable(props) {
    const {nominates, UpdateNominates} = props
    const {poster, updatePoster} = props

    function denominate(value) {
        console.log(nominates)
        const remaingnominates = nominates.filter(nominate => nominate.title != value)
        localStorage.setItem('myValueInLocalStorage', JSON.stringify(remaingnominates));
        const updated_nominates = JSON.parse(localStorage.getItem('myValueInLocalStorage'))
        UpdateNominates(updated_nominates)
        updatePoster('')
        console.log(updated_nominates)
        // UpdateNominates(remaingnominates)

        
    }
    return (
        <Table id='nominates-table' className='nominate-table' hover striped bordered>
          <tbody>
          {!nominates.length ? <tr>you have no nominates</tr> : nominates.map((row, i) => <Nominates key={i}
                                                                                                      title={row.title}
                                                                                                      Poster={row.poster}
                                                                                                      updatePoster={updatePoster}
                                                                                                      denominate={denominate}>
                                                                                                      </Nominates>)}
          </tbody>
        </Table>
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
  return(
      
          <img className='movie-poster' src= {poster}></img>
      )
}
function Movies (props) {
    const [clicked, Updateclicked] = React.useState(false)
    let history = ReactRouterDOM.useHistory()
    const {poster, updatePoster} = props

    function handleMouseHoverON() {
      updatePoster(props.Poster)
    }
  
    function handleMouseHoverOFF() {
      updatePoster('')
    }
  
    return (
      <React.Fragment>
             
        <tr onMouseEnter={handleMouseHoverON} onMouseLeave={handleMouseHoverOFF}>
      
          <td> {props.Title}</td>
          <td>({props.Year})</td>

          {/* <button onClick={()=>history.push(`/movies/${props.id}`, 
                                            {params:{'Title':props.Title,'Year':props.Year,'imbdID':props.imdbID,'Poster':props.Poster}})}>
          click to see details</button> */}
          <td>
            <button className='nominates-button' disabled={clicked} onClick={() => {props.addnominates(props.Title,props.Poster);Updateclicked(true)}}>Nominate</button>
          </td>
        
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
            // console.log(data)
            console.log('api is hit')
            Updatemoviedata(data.Search)
            updatePoster('')
        })
        },[searchTerm])
    const movie_list = []


    function addposter(poster) {
      updatePoster(poster)
      console.log(poster)
    }

    function addnominates(title,Poster) {

        localStorage.setItem('myValueInLocalStorage', JSON.stringify(nominates.concat({title:title, poster:Poster})));
        const updated_nominates = JSON.parse(localStorage.getItem('myValueInLocalStorage'))
        UpdateNominates(updated_nominates)


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
                    addnominates={addnominates}
                    poster={poster}
                    updatePoster={updatePoster}></Movies>)
        }
    }
    // console.log(movie_list)
    
    return (
      <React.Fragment>
         <Table id='movies-table' className='movie-table' hover striped bordered>
           <tbody>
            { !(movie_list).length ? <tr>Enter a Movie</tr>: movie_list }
            </tbody>
          </Table>
          
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
    <div className='searchbar'>
      <input className='searchbar'
              type="text"  
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

function AllComponents (props) {
  
  

  const [searchTerm, updateSearchTerm] = React.useState('');
  // const [nominates, UpdateNominates] = React.useState(initialNominates)

  const {nominates, UpdateNominates} = props
  const [history, UpdateHistory] = React.useState([])
  const [poster,updatePoster] = React.useState('')

  // console.log(nominates.length)
    return (
    
        <React.Fragment>
            { (nominates.length >= 5) ? <header className='header'>You got 5 nominations!!!!</header> : <header></header>}
        <div className="myInput">
            <SearchBar searchTerm={searchTerm} updateSearchTerm={updateSearchTerm}>
            </SearchBar>
           <p className='table-titles'>Search Results</p> 
        
            <MoviesTable searchTerm={searchTerm} 
                          nominates={nominates} 
                          UpdateNominates={UpdateNominates}
                          poster={poster}
                          updatePoster={updatePoster}>
            </MoviesTable>
        </div>
        <div className="myInput">
          <p className='table-titles'>Your Nominations</p>
            <NominatesTable nominates={nominates} UpdateNominates={UpdateNominates} poster={poster} updatePoster={updatePoster}>
         </NominatesTable>
         </div>
         <div>
         <MoviePoster poster={poster} updatePoster={updatePoster}></MoviePoster>
         </div>
        
         
         </React.Fragment>
    )
  
    }
  
function Carousel() {
  const [index, setIndex] = React.useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <ReactBootstrap.Carousel className='homepage-carousel' activeIndex={index} onSelect={handleSelect}>
      <ReactBootstrap.Carousel.Item>
        <img
          className="carousel-img"
          src="https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg"
          alt="First slide"
        />
      </ReactBootstrap.Carousel.Item>
      <ReactBootstrap.Carousel.Item>
        <img
          className="carousel-img"
          src="https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg"
          alt="Second slide"
        />

      </ReactBootstrap.Carousel.Item>
      <ReactBootstrap.Carousel.Item>
        <img
          className="carousel-img"
          src="https://m.media-amazon.com/images/M/MV5BMTM4OGJmNWMtOTM4Ni00NTE3LTg3MDItZmQxYjc4N2JhNmUxXkEyXkFqcGdeQXVyNTgzMDMzMTg@._V1_SX300.jpg"
          alt="Third slide"
        />


      </ReactBootstrap.Carousel.Item>
    </ReactBootstrap.Carousel>
  )
}

function CarouselNominates(props) {


  return(
    <ReactBootstrap.Carousel.Item>
    <img
      className="d-block w-100"
      src={`${props.Poster}`}
      alt={`${props.title}`}
    />
    <ReactBootstrap.Carousel.Caption>
      <h3>First slide label</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </ReactBootstrap.Carousel.Caption>
  </ReactBootstrap.Carousel.Item>
  )
}

function IndexPage(props){
   const {nominates, UpdateNominates} = props
   const [index, setIndex] = React.useState(0);

   const handleSelect = (selectedIndex, e) => {
     setIndex(selectedIndex);
   };

  const nominates_poster = []
  if (nominates.length) {
    for (const poster of nominates) {
    nominates_poster.push(<CarouselNominates key={nominates.indexOf(poster)} title={poster.title}Poster={poster.poster}></CarouselNominates>)
    }
  }
  console.log(nominates_poster)
   let history = ReactRouterDOM.useHistory()
   return (
     <React.Fragment>
       
       {/* {!nominates.length ? <div>you have no nominates</div> : <div>{nominates}</div>} */}
       <img id='img-homepage' src='/static/img/movietheater.jpg'></img>
       <button className='homepage-button' onClick={()=>(history.push('/movies'))}>Click To Start Browsing Movies</button>
      {/* <Carousel></Carousel> */}
  
       {/* <ReactBootstrap.Carousel className='homepage-carousel' activeIndex={index} onSelect={handleSelect}>
          {nominates_poster}
       </ReactBootstrap.Carousel> */}
     </React.Fragment>
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
    const [nominates, UpdateNominates] = React.useState(initialNominates)
    if (nominates.length) {
      // console.log('there is nominates')
    }
    else {
      // console.log('there arent any nominates')
    }
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
          {/* <ReactBootstrap.Navbar id='homepage-nav-bar' className='navbarcolor' fixed="top" variant="light">
            <ReactBootstrap.Navbar.Brand className='home-navbarlink' href="/">HOME
          </ReactBootstrap.Navbar.Brand>
            <ReactBootstrap.Nav > */}
            {/* <ReactBootstrap.Nav.Link > */}
                <ReactRouterDOM.Link className='navbarlink' to='/movies'>
              </ReactRouterDOM.Link>
              {/* </ReactBootstrap.Nav.Link>
              <ReactBootstrap.Nav.Link > */}
                <ReactRouterDOM.Link className='navbarlink' to='/tables'>
              </ReactRouterDOM.Link>
              {/* </ReactBootstrap.Nav.Link>
            </ReactBootstrap.Nav>
   */}
          {/* </ReactBootstrap.Navbar> */}
        </div>
  
      )
    };
    return (
      <AuthContext.Provider value={{loggedIn, setLoggedIn}}>
  
        <ReactRouterDOM.BrowserRouter>
          
          {NavLinks[loggedIn]}
          
          <ReactRouterDOM.Switch>
          <ReactRouterDOM.Route path="/" exact >
                <IndexPage nominates={nominates} UpdateNominates={UpdateNominates} />
              </ReactRouterDOM.Route>
          <ReactRouterDOM.Route path="/movies/:id" >
                <MovieDetails/>
              </ReactRouterDOM.Route>
            <ReactRouterDOM.Route path='/movies'>
              <AllComponents nominates={nominates} UpdateNominates={UpdateNominates} />
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