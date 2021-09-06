import { connect } from "react-redux";
import Button from "./Button";
import Props_Button from "../prop_types/type_props_button";

const mapStateToProps = (state): Props_Button => ({
  cssClass: "btn-primary",
  label: "Seleccionar otro",
  url: "/modificar_producto",
});

const mapDispatchToProps = (dispatch: (any) => any): Props_Button => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Button);
