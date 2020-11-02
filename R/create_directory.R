##' @title Create directory if doesn't exist
##' @param directory
##' @param recursive
##' @return
##' @author Shir Dekel
##' @export
create_directory <- function(directory, recursive = TRUE) {
  if (!dir.exists(directory)) {
    dir.create(directory, recursive = recursive)
  }
}
