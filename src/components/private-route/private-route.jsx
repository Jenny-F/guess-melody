import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Route, Redirect} from "react-router-dom";
import {AppRoute} from "../../const.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import {getAuthorizationStatus} from "../../reducer/user/selector.js";

const PrivateRoute = (props) => {
  const {render, path, exact, authStatus} = props;

  return (
    <Route
      path={path}
      exact={exact}
      render={() => {
        return (
          authStatus === AuthorizationStatus.AUTH ?
            render() :
            <Redirect to={AppRoute.LOGIN} />
        );
      }}
    />
  );
};

PrivateRoute.propTypes = {
  render: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
  authStatus: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  authStatus: getAuthorizationStatus(state),
});

export {PrivateRoute};
export default connect(mapStateToProps)(PrivateRoute);
