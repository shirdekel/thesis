##' @title Render bookdown and force Rmd file dependencies
##' @param input
##' @param config_file
##' @param output_format
##' @param deps
##' @return
##' @author Shir Dekel
##' @export
render_with_deps <- function(input,
                             config_file,
                             output_format,
                             deps) {
  render_book(
    input = input,
    config_file = config_file,
    output_format = output_format
  )
}
