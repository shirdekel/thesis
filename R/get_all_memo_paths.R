##' @title Get all memo paths

##' @param experiment_number
##'
##' @param thesis_project
##'
##' @return
##' @author Shir Dekel
##' @export
get_all_memo_paths <- function(thesis_project, experiment_number) {

  memo_type <-
    c("plan", "summary")

  memo_extension <-
    c("Rmd", "pdf")

  memo_path <-
    list(
      experiment_number,
      thesis_project
    ) %>%
    pmap(
      function(experiment_number_value, thesis_project_value)
        memo_type %>%
        map(
          function(memo_type_value)
            memo_extension %>%
            map(
              function(memo_extension_value)
                get_memo_path(
                  thesis_project_value,
                  experiment_number_value,
                  memo_type_value,
                  memo_extension_value
                )
            ) %>%
            set_names(memo_extension)
        ) %>%
        set_names(memo_type)
    )

  return(memo_path)
}
