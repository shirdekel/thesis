##' @title Get pre experiment trials

##' @return
##' @author Shir Dekel
##' @export
get_experiment_pre <- function() {

  pis <-
    get_pis("prolific")

  get_consent_html()

  consent <-
    get_consent()

  sample_id <-
    get_sample_id("prolific")

  contact <-
    get_contact()

  demographics <-
    get_demographics()

  business_information <-
    get_business_information()

  experiment_pre <-
    build_timeline(
      pis,
      consent,
      sample_id,
      contact,
      demographics,
      business_information
    )

  return(experiment_pre)

}
