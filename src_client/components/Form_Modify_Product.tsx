// react+redux vendor
import React, { Component } from "react";
import { connect } from "react-redux";
import Form_Search_Product from "./Form_Search_Product";

class Form_Modify_Product extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Form_Search_Product />
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: (any) => any) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form_Modify_Product);
