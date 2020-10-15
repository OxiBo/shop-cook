import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchUser } from "../../actions";
const User = ({ fetchUser, user, error, children }) => {
  // ????
  useEffect(() => {
    // console.log("it is running");
    fetchUser();
  }, [fetchUser]);
  console.log(user);
  return <>{children(user, error)}</>;
};

const mapStateToProps = ({ auth }) => {
  return {
    error: auth.authError,
    user: auth.user,
  };
};

export default connect(mapStateToProps, { fetchUser })(User);
