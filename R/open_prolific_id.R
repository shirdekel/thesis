##' @title Open prolific_id file

##' @return
##' @author Shir Dekel
##' @export
open_prolific_id <- function() {

  file.edit(here("inst", "extdata", "prolific_id.txt"))

}
