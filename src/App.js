
import React from 'react';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resultArticles: [],
      isLoading: true,
      isErrorText: '',
      startDate: '',
      endDate: '',
      date: ''
    }
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange =this.handleEndDateChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleDateSearch = this.handleDateSearch.bind(this);
    this.fetchDate = this.fetchDate.bind(this);
  }


  componentDidMount() {
    let url = "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY";
    this.fetchDate(url);
    
  }
  
  handleStartDateChange(event) { 
    let _startDate = event.target.value;
    this.setState({startDate: _startDate});
  }

  handleEndDateChange(event) {
    let _endDate = event.target.value;
    this.setState({endDate: _endDate}); 
  }

  handleDateChange(event) {
    let _date = event.target.value;
    this.setState({date: _date}); 
  }

  handleSearch() {
    let startDate = this.state.startDate;
    let endDate = this.state.endDate;

    let url = `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&start_date=${startDate}&end_date=${endDate}`;
    this.fetchDate(url);

  }

  handleDateSearch() {
    let date = this.state.date;

    let url = `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${date}`;
    this.fetchDate(url);

  }
  
  fetchDate(url) {
    this.setState({isErrorText : ''});

    fetch(url)
      .then(res => res.json())
      .then((result) => {
        if (result.error) {
          let errorMessage= result?.error?.message;
          this.setState({
            isErrorText : errorMessage
          });
          throw new Error(errorMessage);
        }
        else {
          let articles = Array.isArray(result) ? result : [result];
          this.setState({
            resultArticles : articles
          });
          this.setState({isLoading: false});
          this.setState({isErrorText : ''});
          
        }
      })
      .catch((error) => {
        console.log(error)
      });
    
  }

  render() {
    return (
      <div className="App">
            <header className="App-header"></header>
              <div className="Search-box">
                <p><label htmlFor="StartDate"><b> Enter start date:</b> </label>
                  <input type="date" 
                        id="StartDate" 
                        onChange={this.handleStartDateChange}/>

                 <label htmlFor="EndDate"> <b>Enter end date:</b> </label>
                    <input type="date" 
                        id="EndDate" 
                        onChange={this.handleEndDateChange}/>  
                  <input type="submit" value="Search" onClick={this.handleSearch}/>
                  </p>
                  <p>or <label htmlFor="Date"> <b>Enter date:</b> </label>
                    <input type="date" 
                        id="Date" 
                        onChange={this.handleDateChange}/>  
                  <input type="submit" value="Date Search" onClick={this.handleDateSearch}/> </p>

                  <ul className="imageList">
                    {this.state.resultArticles?.map((item, index) => (
                      
                        <li key={index + item?.explanation}
                            
                         >
                          <img src={item?.hdurl} className="articleImg" alt={item?.title} />
                          <p><b>Date:</b> {item?.date}</p>
                          <b>Title:</b> {item?.title}
                          <p><b>Explanation:</b> {item?.explanation}</p>
                          <p><b>Copyright:</b> {item?.copyright}</p>
                        </li>
                      
                    ))}
                   
                      
                  </ul>
                  <p className={` ${this.state.isLoading && this.state.isErrorText === '' ? "" : "hideIsLoading"}`}>Loading ...</p> 
                  <p>{this.state.isErrorText}</p>
                

              </div>
            <footer>
              <p></p>
            </footer>
      </div>
    );
  }
}

export default App;