##' @title Get captcha trial

##' @return
##' @author Shir Dekel
##' @export
get_captcha <- function() {
  captcha <-
    trial_generic(
      "external-html",
      url = insert_resource("recaptcha.html"),
      cont_btn = "submit_button",
      execute_script = TRUE,
      data = insert_property(stage = "captcha")
    )
  return(captcha)
}
