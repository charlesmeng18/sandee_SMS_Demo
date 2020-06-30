import React, { Component } from "react";
import Checkbox from "./Checkbox";

const OPTIONS = ["Sunscreen", "Water", "Parking"];

class CheckList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      to: "",
      sendNotifications: false,
      settings: {
        maxParking: 0
      },
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
    
    console.log(this.state.sendNotifications)
    
    // Array of all the selected options
    var selected = Object.keys(this.state.checkboxes)
    .filter(checkbox => this.state.checkboxes[checkbox])

    //Console Print Statement to confirm correct selections
    console.log(selected)
    
    // Notification that they have successfully signed up for whatever notifications
    fetch('api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      // Send the entire state (with phone number and notification types) to the Server
      body: JSON.stringify(this.state)
    })
      .then(res => res.json());

    var interval;
    // Specific POST for if we should handle parking notifications
    if (this.state.checkboxes["Parking"]) {
      console.log("Enters Parking case")
      interval = setInterval(() => {
        if (!this.state.sendNotifications) {
          clearInterval(interval)
          console.log("interval stopped in this bish");
        } else{
          ////// The exact notifications
          fetch('api/parkingNotifications', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          // Send the entire state (with phone number and notification types) to the Server
          body: JSON.stringify(this.state)
          })
          .then(res => res.json());
        }
        // TODO: Need to have this update to live hours
      }, parseInt(this.state.settings.maxParking) * 20000)
    }

    // Specific POST for if we should handle sunscreen notifications
    if (this.state.checkboxes["Sunscreen"]) {
      console.log("Enters Sunscreen case")
      interval = setInterval(() => {
        if (!this.state.sendNotifications) {
          clearInterval(interval)
          console.log("interval stopped in this bish");
        } else{
          ////// The exact notifications
          fetch('api/sunscreenNotifications', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          // Send the entire state (with phone number and notification types) to the Server
          body: JSON.stringify(this.state)
          })
          .then(res => res.json());
        }
        // TODO: Need to have this update to live hours
      }, 10000)
    }

    // Specific POST for if we should handle water notifications
    if (this.state.checkboxes["Water"]) {
      console.log("Enters Water case")
      interval = setInterval(() => {
        if (!this.state.sendNotifications) {
          clearInterval(interval)
          console.log("interval stopped in this bish");
        } else{
          ////// The exact notifications
          fetch('api/waterNotifications', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          // Send the entire state (with phone number and notification types) to the Server
          body: JSON.stringify(this.state)
          })
          .then(res => res.json());
        }
        // TODO: Need to have this update to live hours
      }, 15000)
    }
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
    this.deselectAll();
  }

  //////////////////////////////////////////////
  updateMaxParking = (event) => {
    this.setState({
      settings : {
        maxParking: event.target.value
      }
    })
  }
  render() {
    return (
      <div className="container">
        <div className="row mt-5">
          <div className="col-sm-12">
            <h2>Sandee Beach Trip Notifications</h2>
            <form onSubmit={this.handleFormSubmit}>
              <div>
                <label htmlFor="to">Enter Phone Number</label>
                <input
                  type="tel"
                  name="to"
                  id="to"
                  value={this.state.to}
                  onChange={this.phoneNumberChange}
                />
              </div>

              {this.createCheckboxes()}
              <label htmlFor="maxParking">Enter Max Parking Hours</label>
              <input
                type="text"
                name="maxParking"
                id="maxParking"
                value={this.state.settings.maxParking}
                onChange={this.updateMaxParking}
              />
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
                  Start Notifications
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