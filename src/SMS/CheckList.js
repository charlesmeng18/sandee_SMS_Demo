import React, { Component } from "react";
import Checkbox from "./Checkbox";
import './SMSForm.css';

const OPTIONS = ["Sunscreen", "Water", "Parking"];

class CheckList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      to: "",
      sendNotifications: false,
      checkboxes: OPTIONS.reduce(
        (options, option) => ({
          ...options,
          [option]: false
        }),
        {}
      )
    }
    this.selectAllCheckboxes = this.selectAllCheckboxes.bind(this);
    this.selectAll = this.selectAll.bind(this);
    this.deselectAll = this.deselectAll.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.createCheckbox = this.createCheckbox.bind(this);
    this.createCheckboxes = this.createCheckboxes.bind(this);
    this.phoneNumberChange = this.phoneNumberChange.bind(this)
  }
;
  ///////////////////////////////////////////////////////////////
  // Function for updating the phone number state when user types in
  phoneNumberChange = event => {
    this.setState({
      to: event.target.value,
    })
  }


  //////////////////////////////////////////////////////////////////////////////////
  // Functions for deselecting all notification options or selecting all notification options
  selectAll = () => this.selectAllCheckboxes(true);
  deselectAll = () => this.selectAllCheckboxes(false);

  // Helper function for the selectAll or deselectAll
  selectAllCheckboxes = isSelected => {
    Object.keys(this.state.checkboxes).forEach(checkbox => {
      // BONUS: Can you explain why we pass updater function to setState instead of an object?
      this.setState(prevState => ({
        checkboxes: {
          ...prevState.checkboxes,
          [checkbox]: isSelected
        }
      }));
    });
  };

  //////////////////////////////////////////////////////
  // Update the state of the checkbox when it is pressed
  handleCheckboxChange = changeEvent => {
    const { name } = changeEvent.target;

    this.setState(prevState => ({
      checkboxes: {
        ...prevState.checkboxes,
        [name]: !prevState.checkboxes[name]
      }
    }));
  };

  //////////////////////////////
  // On the submission of the form, we will make POST request to the server
  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();
    
    this.setState({
      sendNotifications: true
    })
    console.log("Setting notifications to true")
    Object.keys(this.state.checkboxes)
      .filter(checkbox => this.state.checkboxes[checkbox])
      .forEach(checkbox => {
        console.log(checkbox, "is selected.");
      });
    // Console Print Statement to confirm correct selections
    console.log(Object.keys(this.state.checkboxes)
    .filter(checkbox => this.state.checkboxes[checkbox]))

    // // The POST Request
    // fetch('api/reminders', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   // Send the entire state (with phone number and notification types) to the Server
    //   body: JSON.stringify(this.state)
    // })
    //   .then(res => res.json());
    
    var interval;

    console.log(this.state.sendNotifications)

    
    var interval = setInterval(() => {
      if (!this.state.sendNotifications) {
        clearInterval(interval)
        console.log("interval stopped in this bish");
      } else{
        console.log("Shit is intervalling where notifications would be active")
      }
    }, 3000)

    this.deselectAll();
  };
  ///////////////////////////////////////////
  // Functions  create the checkboxes
  createCheckbox = option => (
    <Checkbox
      label={option}
      isSelected={this.state.checkboxes[option]}
      onCheckboxChange={this.handleCheckboxChange}
      key={option}
    />
  );
  createCheckboxes = () => OPTIONS.map(this.createCheckbox);

  ////////////////////////////////////////////
  stopNotifications = () => {
    this.setState({
      sendNotifications: false
    })
  }
  render() {
    return (
      <div className="container">
        <div className="row mt-5">
          <div className="col-sm-12">
            <form onSubmit={this.handleFormSubmit}>
              <div>
                {/* <label htmlFor="to">Enter Phone Number</label> */}
                <input
                type="tel"
                name="to"
                id="to"
                value={this.state.to}
                onChange={this.phoneNumberChange}
                />
              </div>

              {this.createCheckboxes()}
              <div>
                <button
                  type="button"
                  className="btn btn-outline-primary mr-2"
                  onClick={this.selectAll}
                >
                  Select All
                </button>
                <button
                  type="button"
                  className="btn btn-outline-primary mr-2"
                  onClick={this.deselectAll}
                >
                  Deselect All
                </button>
                <button type="submit" className="btn btn-primary">
                  Send Notifications
                </button>
              </div>
            </form>
            <form onSubmit={this.stopNotifications}>
              <button type="submit" className="btn btn-primary">
                Stop Notifications
              </button>

            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CheckList;