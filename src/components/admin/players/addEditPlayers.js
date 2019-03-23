import React, { Component, Fragment } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import AdminLayout from '../../../hoc/adminLayout';
import FormField from '../../ui/formFields';
import { validate } from '../../ui/misc';
import { firebaseDB, firebasePlayers, firebase } from '../../../firebase';
import Fileuploader from '../../ui/fileuploader';

class AddEditPlayers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
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
          valid: false
        }
      }
    };
  }

  componentDidMount() {
    const playerId = this.props.match.params.id;

    console.log(playerId);
    if (!playerId) {
      this.setState({
        formType: 'Add Player',
        isLoading: false
      });
    } else {
      firebasePlayers
        .child(playerId)
        .once('value')
        .then(snapshot => {
          const playerData = snapshot.val();
          firebase
            .storage()
            .ref('players')
            .child(playerData.image)
            .getDownloadURL()
            .then(url => {
              this.updateFileds(playerData, playerId, 'Edit player', url);
            })
            .catch(e => {
              this.updateFileds(
                { ...playerData, image: '' },
                playerId,
                'Edit player',
                ''
              );
            });
        })
        .catch(err => {
          console.log(err);
          this.setState({ isLoading: false });
        });
    }
  }

  updateFileds(player, playerId, formType, defaultImg) {
    const newFormdata = { ...this.state.formdata };

    for (let key in newFormdata) {
      newFormdata[key].value = player[key];
      newFormdata[key].valid = true;
    }

    this.setState({
      playerId,
      defaultImg,
      formType,
      formdata: newFormdata,
      isLoading: false
    });
  }

  updateForm(element, content = '') {
    const newFormdata = { ...this.state.formdata };
    const newElement = { ...newFormdata[element.id] };

    if (!content) {
      newElement.value = element.event.target.value;
    } else {
      newElement.value = content;
    }

    let validData = validate(newElement);
    newElement.valid = validData[0];
    newElement.validationMessage = validData[1];

    newFormdata[element.id] = newElement;

    this.setState({ formdata: newFormdata, formError: false });
    // 更新表格內容之後把 formError 設成 false
  }

  successForm(message) {
    this.setState({ formSuccess: message });
    setTimeout(() => {
      this.setState({ formSuccess: '' });
    }, 2000);
  }

  submitForm(event) {
    event.preventDefault();

    let dataToSubmit = {};
    let formIsValid = true;

    for (let key in this.state.formdata) {
      dataToSubmit[key] = this.state.formdata[key].value;
      formIsValid = this.state.formdata[key].valid && formIsValid;
    }

    if (formIsValid) {
      if (this.state.formType === 'Edit player') {
        firebasePlayers
          .child(this.state.playerId)
          .update(dataToSubmit)
          .then(() => {
            this.successForm('Update correctly!');
            // this.props.history.push('/admin_players');
          })
          .catch(err => {
            this.setState({ formError: true });
            console.log(err);
          });
      } else {
        firebasePlayers
          .push(dataToSubmit)
          .then(() => {
            this.props.history.push('/admin_players');
          })
          .catch(error => {
            console.log(error);
            this.setState({ formError: true });
          });
      }
    } else {
      this.setState({ formError: true });
    }
  }

  resetImage() {
    const newFormdata = { ...this.state.formdata };
    newFormdata['image'].value = '';
    newFormdata['image'].valid = '';
    this.setState({
      defaultImg: '',
      formdata: newFormdata
    });
  }

  storeFilename(filename) {
    this.updateForm({ id: 'image' }, filename);
  }

  render() {
    return (
      <AdminLayout>
        <div className="editplayers_dialog_wrapper">
          {this.state.isLoading ? (
            <div className="admin_progress">
              {this.state.isLoading ? (
                <CircularProgress thickness={7} style={{ color: '#98c5e9' }} />
              ) : null}
            </div>
          ) : (
            <Fragment>
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
            </Fragment>
          )}
        </div>
      </AdminLayout>
    );
  }
}

export default AddEditPlayers;
