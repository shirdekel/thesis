##' @title Zip experiment files
##'
##' To send to technology officer for uploading to server
##'
##' @param path
##' @return
##' @author Shir Dekel
##' @export
zip_experiment <- function(path) {

  path %>%
    here() %>%
    file.path("experiment.zip") %>%
    zip(
      files = "experiment",
      root = here(path)
    )

}
