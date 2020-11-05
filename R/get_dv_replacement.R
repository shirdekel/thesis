##' @title Get DV replacement for Experiment 3

##' @param data_raw
##'
##' @param dv
##' @param dv_id
##'
##' @return
##' @author Shir Dekel
##' @export
get_dv_replacement <- function(data_raw, dv, dv_id) {

  question_text <-
    data_raw %>%
    filter(StartDate %>%
             str_detect("Start Date")) %>%
    unlist()

  dv_lookup_keys <-
    dv %>%
    str_sub(1, 4) %>%
    c(str_c("project ", c(1:5), "'s"))

  dv_old <-
    dv_lookup_keys %>%
    map(
      ~ question_text %>%
        str_to_lower() %>%
        str_which(.x) %>%
        question_text[.] %>%
        names()
    )

  dv_replacement <-
    list(
      dv_old,
      dv_id
    )%>%
    pmap(
      ~ .x %>%
        str_replace("Q\\d*", .y)%>%
        set_names(.x)
    ) %>%
    unlist()

  return(dv_replacement)

}
