const {Table} = ReactBootstrap;


function NominateButton(props) {

  const {disable} = props
  const {clicked, Updateclicked} =props

  return (
    <React.Fragment>
    <button className='nominates-button' disabled={disable} onClick={() => {props.addnominates(props.Title,props.Poster,props.id);props.Updateclicked(true)}}>Nominate</button>
      {/* {disable ? <button className='nominates-button' disable={disable}>{`${disable}`}</button>: 
      <button className='nominates-button' disable={disable}>disabled</button>} */}
      
    </React.Fragment>
  
  )
}

function Nominates(props) {
  
  
  const {poster, updatePoster} = props

  function handleMouseHoverON() {
    updatePoster(props.Poster)
  }

  function handleMouseHoverOFF() {
    updatePoster('')
  }

    return (
        <React.Fragment>
        <tr onMouseEnter={handleMouseHoverON} onMouseLeave={handleMouseHoverOFF}  >

            <td>{props.title}</td>
            <td><button className='nominates-button' onClick={() => props.denominate(props.id)}>Remove</button></td>
        </tr>
        
        </React.Fragment>
    )
}


function NominatesTable(props) {

    
    const {nominates, UpdateNominates} = props
    const {poster, updatePoster} = props

    function denominate(value) {
        
        const remaingnominates = nominates.filter(nominate => nominate.id != value)

        localStorage.setItem('myValueInLocalStorage', JSON.stringify(remaingnominates));
        const updated_nominates = JSON.parse(localStorage.getItem('myValueInLocalStorage'))

        UpdateNominates(updated_nominates)
       
        updatePoster(null)
    }
    return (
        <Table id='nominates-table' className='nominate-table' hover striped bordered>
          <tbody>
          {!nominates.length ? <tr>you have no nominates</tr> : nominates.map((row, i) => <Nominates key={i}
                                                                                                      id={row.id}
                                                                                                      title={row.title}
                                                                                                      Poster={row.poster}
                                                                                                      updatePoster={updatePoster}
                                                                                                      denominate={denominate}>
                                                                                                      </Nominates>)}
          </tbody>
        </Table>
    )
}

function MovieDetailsElement(props) {
  let history = ReactRouterDOM.useHistory()
  return (
   <React.Fragment>
     <div  className='movie-details'>
       <button className='back-btn' onClick={()=>history.push('/movies')}>Back to search results</button>
      <div>
          {props.Title}
          <div className='movie-primary-details'>
              Released: {props.Released} <br></br>
              Language: {props.Language} <br></br>
              Director: {props.Director}<br></br>
              Type: {props.Type}<br></br>
              
              
          </div>
      </div>
      <div className='movie-plot'>
            Plot
            <div className='plot-text'>{props.Plot}</div>
      </div>
      <img className='movie-poster' src={props.Poster}></img>
      <div>
      <div className='additional-info'> 
      Addition infomation<br></br>
        <div className='movie-secondary-details'>
            Box Office: {props.BoxOffice} <br></br>
            Rated: {props.Rated} <br></br>
            Awards: {props.Awards} <br></br>
            Actors: {props.Actors} <br></br>
        </div>
        </div>
      </div>
      </div>
    </React.Fragment>
  )
}

function MovieDetails(props){
  const location = ReactRouterDOM.useLocation();
  const params  = location.state.params
  // const { id } = ReactRouterDOM.useParams();
  // console.log('this is test1')

  const [moviedetails, Updatemoviedetilas] = React.useState([])

  React.useEffect(() => {
    fetch(`https://www.omdbapi.com/?apikey=6bd6e741&i=${params.id}`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        // console.log('api is hit')
        Updatemoviedetilas(data)
    })
    },[])

    // console.log(moviedetails)
  
  return (<div>
             <MovieDetailsElement     key = {moviedetails.imdbID}
                                      Title={moviedetails.Title}
                                      Released={moviedetails.Released} 
                                      Language={moviedetails.Language}
                                      BoxOffice={moviedetails.BoxOffice}
                                      Director={moviedetails.Director}
                                      Plot={moviedetails.Plot}
                                      Rated={moviedetails.Rated}
                                      Awards={moviedetails.Awards}
                                      Actors={moviedetails.Actors}
                                      Type={moviedetails.Type}
                                      Poster={moviedetails.Poster}></MovieDetailsElement>
          </div>)
}

function MoviePoster(props) {
  const {poster, updatePoster} = props
  return(
        <img className='movie-poster' src= {poster}></img>
      )
}


function Movies (props) {
    const {moviedata, Updatemoviedata} = props
    const {disable} = props
    const [clicked, Updateclicked] = React.useState(disable)
    let history = ReactRouterDOM.useHistory()
    const {poster, updatePoster} = props

    function handleMouseHoverON() {
      updatePoster(props.Poster)
    }
  
    function handleMouseHoverOFF() {
      updatePoster('')
    }
    // console.log('updating nominates')
    return (
      <React.Fragment>
             
        <tr onMouseEnter={handleMouseHoverON} onMouseLeave={handleMouseHoverOFF}>
      
          <td> <a className='movielinks' href='' onClick={(event)=>{event.preventDefault();history.push(`/movies/${props.id}`, 
                                            {params:{id:props.id}})}}>{props.Title}</a></td>
         
          <td>({props.Year})</td>

          {/* <button onClick={()=>history.push(`/movies/${props.id}`, 
                                            {params:{id:props.id}})}>click to see details</button> */}
          <td>
            <button className='nominates-button' disabled={disable} onClick={() => {props.addnominates(props.Title,props.Poster,props.id);Updateclicked(true)}}>Nominate</button>
            {/* <NominateButton disable={disable} addnominates={props.addnominates} id={props.id} Title={props.Title} Poster={props.Poster} Updateclicked={Updateclicked}></NominateButton> */}
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
        fetch(`https://www.omdbapi.com/?apikey=6bd6e741&s=${searchTerm}`)
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            // console.log('api is hit')
            Updatemoviedata(data.Search)
            updatePoster('')
        })
        },[searchTerm])

    const movie_list = []

    function addnominates(title,Poster,id) {

        localStorage.setItem('myValueInLocalStorage', JSON.stringify(nominates.concat({title:title, poster:Poster,id:id})));
        const updated_nominates = JSON.parse(localStorage.getItem('myValueInLocalStorage'))
        UpdateNominates(updated_nominates)


    }

    const nominates_id = []
    if (nominates.length) {
      for (const nominate of nominates)
      nominates_id.push(nominate.id)
    }
    // console.log(nominates_id)
    if (moviedata) {
        for (const movie of moviedata) {
          if (nominates_id.includes(movie.imdbID)) {
            const disable = true
            // console.log('this movie has been nominated')
            movie_list.push(
              <Movies key={movie.imdbID}
                      Title={movie.Title}
                      Year={movie.Year}
                      id={movie.imdbID}
                      Poster={movie.Poster}
                      addnominates={addnominates}
                      poster={poster}
                      disable = {disable}
                      updatePoster={updatePoster}
                      moviedata={moviedata}>
                      </Movies>)
          }
          else {
            const disable = false
            movie_list.push(
            <Movies key={movie.imdbID}
                    disable = {disable}
                    Title={movie.Title}
                    Year={movie.Year}
                    id={movie.imdbID}
                    Poster={movie.Poster}
                    addnominates={addnominates}
                    poster={poster}
                    updatePoster={updatePoster}
                    moviedata={moviedata}></Movies>)
            }
        }
    }
    
    return (
      <React.Fragment>
         <Table id='movies-table' className='movie-table' hover striped bordered>
           <tbody>
            { !(movie_list).length ? <tr>movie name. eg: "Iron Man"</tr>: movie_list }
            </tbody>
          </Table>
          
      </React.Fragment>
        )
}



function SearchBar(props){
    const {searchTerm, updateSearchTerm}= props
    
    function handlechange(e) {
        sessionStorage.setItem('SearchTermInLocalStorage', JSON.stringify(e.target.value));
        const updated_searchterm = JSON.parse(sessionStorage.getItem('SearchTermInLocalStorage'))
        // console.log(updated_searchterm)
        updateSearchTerm(updated_searchterm)
    }

    function clearInput() {
      sessionStorage.setItem('SearchTermInLocalStorage', JSON.stringify(''));
      const updated_searchterm = JSON.parse(sessionStorage.getItem('SearchTermInLocalStorage'))
      updateSearchTerm(updated_searchterm)
    }

    return (
    <div>
      <input className='searchbar'
              type="text"  
              value={searchTerm} 
              onChange={handlechange}
              placeholder="Search for Movie...">
              </input><button className='clear-btn' onClick={clearInput}>clear</button>
            </div>)
}


let initialNominates = JSON.parse(localStorage.getItem('myValueInLocalStorage'))
  
  if (!initialNominates) {
    localStorage.setItem('myValueInLocalStorage', JSON.stringify([]));
    initialNominates = JSON.parse(localStorage.getItem('myValueInLocalStorage'))
  }
  //  console.log(initialNominates)



function usePersistedState(key, defaultValue) {
  const [state, setState] = React.useState(
    localStorage.getItem(key) || defaultValue
  );
  useEffect(() => {
    localStorage.setItem(key, state);
  }, [key, state]);
  return [state, setState];
}

function AllComponents (props) {

  let initialSearchTerm = JSON.parse(sessionStorage.getItem('SearchTermInLocalStorage'))
  if (!initialSearchTerm) {
    sessionStorage.setItem('SearchTermInLocalStorage', JSON.stringify(''));
    initialSearchTerm = JSON.parse(sessionStorage.getItem('SearchTermInLocalStorage'))
  }
  //  console.log(initialNominates)

  // console.log(initialSearchTerm)

  const [searchTerm, updateSearchTerm] = React.useState(initialSearchTerm);

  const {nominates, UpdateNominates} = props
  const [history, UpdateHistory] = React.useState([])
  const [poster,updatePoster] = React.useState('')


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
  // console.log(nominates_poster)
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
  
  
  function App() {
    
    const [nominates, UpdateNominates] = React.useState(initialNominates)  
    
    return (
  
        <ReactRouterDOM.BrowserRouter>
          
          <ReactRouterDOM.Link className='navbarlink' to='/movies'>
              </ReactRouterDOM.Link>
              <ReactRouterDOM.Link className='navbarlink' to='/tables'>
              </ReactRouterDOM.Link>
          
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
    )
  }

  ReactDOM.render(
    <App />,
    document.getElementById('root'))
  
  
      //react async issue-- fixed by adding a conditional in the TestMap component 
  
  //push vs concat. push returns the new length of the array concat returns a new array