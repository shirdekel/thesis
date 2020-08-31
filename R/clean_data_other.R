##' @title Clean other data

##' @return
##' @author Shir Dekel
##' @export
clean_data_other <- function(data_raw_prep) {

  data_other <-
    data_raw_prep %>%
    drop_na(responses) %>%
    filter(stage != "project_choice") %>%
    nest_by(subject) %>%
    mutate(other = data %>%
             pull(responses) %>%
             map_dfc(fromJSON) %>%
             list()) %>%
    unnest(other) %>%
    ungroup() %>%
    select(-data)

  return(data_other)

}
