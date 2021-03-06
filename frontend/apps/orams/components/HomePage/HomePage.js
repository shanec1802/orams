import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'

import LoginForm from 'shared/Login/LoginForm'
import BaseForm from 'shared/form/BaseForm'
import formProps from 'shared/form/formPropsSelector'
import { login } from 'orams/actions/appActions'

export class HomePageComponent extends BaseForm {
  static propTypes = {
    model: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    currentlySending: PropTypes.bool.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      submitClicked: null,
      currentlySending: null
    }
  }

  onSubmitClicked = () => {
    this.setState({
      submitClicked: new Date().valueOf()
    })
  }

  render() {
    const { model, loggedIn, handleSubmit, currentlySending, userType } = this.props
    const initialPage = userType === 'buyer' ? '/seller-catalogue' : '/profile'

    return (
      <div>
        <main>
          <div id="login-page">
            {loggedIn
              ? <Redirect to={initialPage} />
              : <LoginForm
                  submitClicked={this.onSubmitClicked}
                  handleSubmit={handleSubmit}
                  model={model}
                  currentlySending={currentlySending}
                  framework="ORAMS"
                />}
          </div>
          <div className="row">
            <div className="col-xs-12">
              <span />
              <h2 className="au-display-lg">About ORAMS</h2>
              <p>
                ORAMS is a collective rehabilitation and medical service panel. Its aim is to streamline rehabilitation
                and medical service procurement between agencies, with the purpose of cost-saving, reduced duplication,
                join-solutions, and increased performance and efficiency.
              </p>
              <p>
                For ORAMS panel information, templates and updates please visit{' '}
                <a href="http://govdex.gov.au">
                  <strong>govdex.gov.au</strong>
                </a>
              </p>
            </div>
          </div>
        </main>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...formProps(state, 'loginForm'),
  loggedIn: state.app.loggedIn,
  currentlySending: state.app.currentlySending,
  userType: state.app.userType
})

const mapDispatchToProps = dispatch => ({
  handleSubmit: values => dispatch(login(values))
})

const HomePage = withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePageComponent))

export default HomePage
