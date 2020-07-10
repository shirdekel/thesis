##' @title Sample sequence values
##'
##' @param seq
##' @param size
##'
##' @return
##' @author Shir Dekel
##' @export
get_seq_sample <- function(seq, size) {

  seq_sample <- seq %>%
    sample(size = size, replace = TRUE)

  return(seq_sample)

}
