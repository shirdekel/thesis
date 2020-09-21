##' @title Get memo path

##' @param thesis_project
##'
##' @param experiment_number
##' @param memo_type
##' @param memo_extension
##'
##' @return
##' @author Shir Dekel
##' @export
get_memo_path <- function(thesis_project, experiment_number, memo_type, memo_extension) {

  memo_directory <-
    here(
      "doc",
      memo_type,
      thesis_project,
      str_c(
        "experiment",
        experiment_number
      )
    )


  memo_path <-
    memo_directory %>%
    file.path(
      str_c(
        str_c(
          memo_type,
          thesis_project,
          str_c("experiment", experiment_number),
          sep = "_"
        ),
        memo_extension,
        sep = "."
      )
    )

  return(memo_path)

}
