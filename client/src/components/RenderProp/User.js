import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchUser } from "../../actions";
const User = ({fetchUser, user, error, children }) => {

    // ????
  useEffect(() => {
      console.log("it is running")
    fetchUser();
  }, [fetchUser]);

  return <div>{children(user, error)}</div>;
};

const mapStateToProps = ({ auth }) => {
  return {
    error: auth.authError,
    user: auth.user,
  };
};

export default connect(mapStateToProps, { fetchUser })(User);
