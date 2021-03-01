##' @title Get phase variable

##' @param block
##'
##' @return
##' @author Shir Dekel
##' @export
get_phase <- function(block) {

  case_when(
    (str_detect(block, "low|high") &
       !str_detect(block, "eval")) ~ "pre",
    (str_detect(block, "low|high") &
       str_detect(block, "eval")) ~ "post",
  )

}
