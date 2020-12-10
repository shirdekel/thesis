##' @title Generate consent HTML file
##'
##' Template from jsPsych html-external example

##' @author Shir Dekel
##' @export
get_consent_html <- function(experiment_resources) {

  consent_html <- withTags(
    div(id = "consent",
        p(
          img(src = insert_resource("consent.png"),
              width = "750")
        ),
        p(
          label(`for` = "consent_checkbox",
                "I agree to take part in this study."),
          input(type = "checkbox",
                id="consent_checkbox")
        ),
        button(type = "button",
               id="start",
               "Start Experiment"),
        p(style = "font-size:10px",
          "Business decision making"),
        p(style = "font-size:10px",
          "Version 2 18/01/19"),
        p(style = "font-size:10px",
          "Page 1 of 1")
    )
  )

  consent_html %>%
    save_html(
      here(
        experiment_resources,
        "consent.html"
      )
    )

}
