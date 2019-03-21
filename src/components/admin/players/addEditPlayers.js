import React, { Component } from 'react';

import AdminLayout from '../../../hoc/adminLayout';
import FormField from '../../ui/formFields';
import { validate } from '../../ui/misc';
import { firebaseDB, firebasePlayers, firebase } from '../../../firebase';
import Fileuploader from '../../ui/fileuploader';

class AddEditPlayers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playerId: '',
      formType: '',
      formError: false,
      formSuccess: '',
      defaultImg: '',
      formdata: {
        name: {
          element: 'input',
          value: '',
          config: {
            label: 'Player Name',
            name: 'name_input',
            type: 'text'
          },
          validation: {
            required: true
          },
          valid: false,
          validationMessage: '',
          showlabel: true
        },
        lastname: {
          element: 'input',
          value: '',
          config: {
            label: 'Player Last name',
            name: 'lastname_input',
            type: 'text'
          },
          validation: {
            required: true
          },
          valid: false,
          validationMessage: '',
          showlabel: true
        },
        number: {
          element: 'input',
          value: '',
          config: {
            label: 'Player number',
            name: 'number_input',
            type: 'text'
          },
          validation: {
            required: true
          },
          valid: false,
          validationMessage: '',
          showlabel: true
        },
        position: {
          element: 'select',
          value: '',
          config: {
            label: 'Select a position',
            name: 'select_position',
            type: 'select',
            options: [
              { key: 'Keeper', value: 'Keeper' },
              { key: 'Defence', value: 'Defence' },
              { key: 'Midfield', value: 'Midfield' },
              { key: 'Striker', value: 'Striker' }
            ]
          },
          validation: {
            required: true
          },
          valid: false,
          validationMessage: '',
          showlabel: false
        },
        image: {
          element: 'image',
          value: '',
          validation: {
            required: true
          },
          valid: true
        }
      }
    };
  }

  componentDidMount() {
    const playerId = this.props.match.params.id;

    console.log(playerId);
    if (!playerId) {
      this.setState({
        formType: 'Add Player'
      });
    } else {
      /// EDIT
    }
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

  submitForm(event) {
    event.preventDefault();

    let dataToSubmit = {};
    let formIsValid = true;

    this.state.teams.forEach(team => {
      if (team.shortName === dataToSubmit.local) {
        dataToSubmit['localThmb'] = team.thmb;
      }
      if (team.shortName === dataToSubmit.away) {
        dataToSubmit['awayThmb'] = team.thmb;
      }
    });

    if (formIsValid) {
      // SUBMIT FORM
    } else {
      this.setState({ formError: true });
    }
  }

  resetImage() {}

  storeFilename() {}

  render() {
    return (
      <AdminLayout>
        <div className="editplayers_dialog_wrapper">
          <h2>{this.state.formType}</h2>

          <div>
            <form onSubmit={event => this.submitForm(event)}>
              <Fileuploader
                dir="players"
                tag={'Player image'}
                defaultImg={this.state.defaultImg}
                defaultImgName={this.state.formdata.image.value}
                resetImage={() => this.resetImage()}
                filename={filename => this.storeFilename(filename)}
              />

              <FormField
                id={'name'}
                formdata={this.state.formdata.name}
                onChange={this.updateForm.bind(this)}
              />

              <FormField
                id={'lastname'}
                formdata={this.state.formdata.lastname}
                onChange={this.updateForm.bind(this)}
              />

              <FormField
                id={'number'}
                formdata={this.state.formdata.number}
                onChange={this.updateForm.bind(this)}
              />

              <FormField
                id={'position'}
                formdata={this.state.formdata.position}
                onChange={this.updateForm.bind(this)}
              />

              <div className="success_label">{this.state.formSuccess}</div>
              {this.state.formError ? (
                <div className="error_label">Something is wrong</div>
              ) : (
                ''
              )}

              <div className="admin_submit">
                <button onClick={event => this.submitForm(event)}>
                  {this.state.formType}
                </button>
              </div>
            </form>
          </div>
        </div>
      </AdminLayout>
    );
  }
}

export default AddEditPlayers;
