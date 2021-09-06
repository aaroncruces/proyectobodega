import { connect } from "react-redux";
import type_Props_Button_Link_Router from "./prop_types/type_Props_Button_Link_Router";
import Button_Link_Router from "./Button_Link_Router";

const mapStateToProps = (state): type_Props_Button_Link_Router => ({
  cssClass: "btn-primary",
  label: "Seleccionar otro",
  url: "/modificar_producto",
});

const mapDispatchToProps = (
  dispatch: (any) => any
): type_Props_Button_Link_Router => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Button_Link_Router);
