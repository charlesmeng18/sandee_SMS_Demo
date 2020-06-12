import React, {Component} from 'react';
import './SMSForm.css';

// Component for client to send POST request to server and receive an SMS
export default class SMSForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: {
        to: '',
        body: 'Whats good w you my gurney'
      },
      submitting: false,
      error: false
    }
    this.onHandleChange = this.onHandleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // Handle Submission
  onSubmit(event) {
    event.preventDefault();
    // first set "submitting" state to be true
    this.setState({submitting: true});
    // send the post request to api/messages endpoint
    fetch('api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.message)
    })
      .then(res=> res.json())
      .then(data => {
        // if we successfully submitted the form to the server,
        // reset the state variables
        if(data.success) {
          this.setState({
            error: false,
            submitting: false,
            message: {
              to: '',
              body: ''
            }
          });
        } else {
          // error handling for the POST request
          this.setState({
            error: true,
            submitting: false
          })
        }
      })
  }


  // Update the state to reflect the client's "to" and "body" inputs
  onHandleChange(event) {
    const name = event.target.getAttribute('name');
    this.setState({
      message: {...this.state.message, [name]: event.target.value}
    })
  }
  render() {
    return (

      <div>
        <form
          onSubmit={this.onSubmit}
          className={this.state.error ? 'error sms-form' : 'sms-form'}
        >
          <div>
            <label htmlFor="to">Phone Number:</label>

            {/* client inputs the recipient of the text message */}
            <input
              type="tel"
              name="to"
              id="to"
              value={this.state.message.to}
              onChange={this.onHandleChange}
            />
          </div>

          {/* client writes the text message's body */}
          {/* <div>
            <label htmlFor="body">Text Body:</label>
            <textarea 
              name="body" 
              id="body"
              value={this.state.message.body}
              onChange={this.onHandleChange}
              />
          </div> */}

          <button 
            type="submit"
            disabled={this.state.submitting}
          >
            Submit
          </button>
        </form>
      </div>
    )
  }
}