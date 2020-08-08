##' @title Analyse using glmer

##' @param data
##'
##' @return
##' @author Shir Dekel
##' @export
get_analysis_glmer <- function(data) {

  data_distribution <- data %>%
    filter(presentation == "separate", awareness == "naive")

  model_distribution <- glmer(choice ~ distribution + (1 | id), family = binomial, data = data_distribution)

  data_presentation <- data %>%
    filter(distribution == "absent", awareness == "naive")

  model_presentation <- glmer(choice ~ presentation + (1 | id), family = binomial, data = data_presentation)

  data_awareness <- data %>%
    filter(distribution == "absent", presentation == "separate")

  model_awareness <- glmer(choice ~ awareness + (1 | id), family = binomial, data = data_awareness)

  analysis_choice <- c(model_presentation, model_distribution, model_awareness) %>%
    map(apa_print) %>%
    set_names("presentation", "distribution", "awareness")

  return(analysis_choice)

}
