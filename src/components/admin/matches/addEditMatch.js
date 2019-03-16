import React, { Component } from 'react';

import AdminLayout from '../../../hoc/adminLayout';
import FormField from '../../ui/formFields';
import { validate } from '../../ui/misc';

class AddEditMatch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      matchId: '',
      formType: '',
      formError: false,
      formSuccess: '',
      teams: [],
      formdata: {
        date: {
          element: 'input',
          value: '',
          config: {
            label: 'Event date',
            name: 'date_input',
            type: 'date'
          },
          validation: {
            required: true
          },
          valid: false,
          validationMessage: '',
          showlabel: true
        },
        local: {
          element: 'select',
          value: '',
          config: {
            label: 'Select the local team',
            name: 'select_local',
            type: 'select',
            options: []
          },
          validation: {
            required: true
          },
          valid: false,
          validationMessage: '',
          showlabel: false
        }
      }
    };
  }

  updateForm(element) {
    const newFormdata = { ...this.state.formdata };
    const newElement = { ...newFormdata[element.id] };

    newElement.value = element.event.target.value;

    let validData = validate(newElement);
    newElement.valid = validData[0];
    newElement.validationMessage = validData[1];

    newFormdata[element.id] = newElement;

    this.setState({ formdata: newFormdata, formError: false });
  }

  render() {
    return (
      <AdminLayout>
        <div className="editmatch_dialog_wrapper">
          <h2>{this.state.formType}</h2>

          <div>
            <form onSubmit={event => this.submitForm(event)}>
              <FormField
                id={'date'}
                formdata={this.state.formdata.date}
                onChange={this.updateForm.bind(this)}
              />
              <FormField
                id={'local'}
                formdata={this.state.formdata.local}
                onChange={this.updateForm.bind(this)}
              />
            </form>
          </div>
        </div>
      </AdminLayout>
    );
  }
}

export default AddEditMatch;
