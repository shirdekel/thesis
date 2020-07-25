##' @title Get consent trial

##' @return
##' @author Shir Dekel
##' @export
get_consent <- function() {

  consent <- trial_generic(
    "external-html",
    url = insert_resource("consent.html"),
    cont_btn = "start",
    check_fn = insert_javascript("function(elem) {
  if (document.getElementById('consent_checkbox').checked) {
    return true;
  }
  else {
    alert('If you wish to participate, you must check the box next to the statement <em>I agree to participate in this study.</em>');
    return false;
  }
  return false;
}"),
    data = insert_property(stage = "consent")
    )

  return(consent)

}
