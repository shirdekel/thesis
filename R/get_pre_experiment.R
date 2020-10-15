##' @title Get pre experiment trials

##' @param ethics
##'
##' @return
##' @author Shir Dekel
##' @export
get_pre_experiment <- function(ethics, experiment_resources) {
  captcha <- NULL

  pis <- NULL

  consent <- NULL

  get_consent_html(experiment_resources)

  if (ethics) {
    captcha <-
      get_captcha()

    pis <-
      get_pis("prolific")

    consent <-
      get_consent()
  }

  sample_id <-
    get_sample_id("prolific")

  contact <-
    get_contact()

  demographics <-
    get_demographics()

  business_information <-
    get_business_information()

  pre_experiment <-
    build_timeline(
      pis,
      consent,
      sample_id,
      contact,
      demographics,
      business_information
    ) %>%
    map(compact) # Remove PIS and consent if `NULL`

  return(pre_experiment)
}
