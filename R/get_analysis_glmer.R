##' @title Analyse using glmer

##' @param data
##'
##' @return
##' @author Shir Dekel
##' @export
get_analysis_glmer <- function(data) {

  data_distribution <- data %>%
    filter(presentation == "separate")

  model_distribution <- glmer(choice ~ distribution + (1 | id), family = binomial, data = data_distribution)

  data_presentation <- data %>%
    filter(distribution == "absent")

  model_presentation <- glmer(choice ~ presentation + (1 | id), family = binomial, data = data_presentation)

  analysis_glmer <- c(model_presentation, model_distribution) %>%
    map(apa_print) %>%
    set_names("presentation", "distribution")

  return(analysis_glmer)

}
