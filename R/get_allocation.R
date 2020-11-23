##' @title Get allocation input

##' @return
##' @author Shir Dekel
##' @export
get_allocation <- function() {
  allocation <-
    "allocation" %>%
    str_c("q", c("projectA", "projectB"), sep = "_") %>%
    list(c("Project A", "Project B") %>%
      str_c(" allocation: ")) %>%
    pmap(
      ~ get_survey_number(
        .y,
        .x,
        suffix = "%"
      ) %>%
        p() %>%
        as.character()
    ) %>%
    str_c(collapse = "")
  return(allocation)
}
