##' @title screenshots E4

##' @return
##' @author Shir Dekel
##' @export
get_screenshots_experiment4 <- function() {

  file_paths_materials_experiment4 <-
    here("inst", "materials", "experiment4")

  file_paths_experiment4 <-
    here("inst", "jspsych", "experiment4", "experiment")

  c("naive", "aware") %>%
    map(
      ~ file.path(file_paths_experiment4, "index.html") %>%
        webshot(
          file = file.path(
            file_paths_materials_experiment4,
            str_c("instructions_", .x, ".png")
          ),
          selector = "#jspsych-content",
          eval =
            str_c(
              "casper.thenOpen(this.getCurrentUrl() + '?awareness=",
              .x,
              "', function() {

              // Test page
              this.click('#jspsych-html-button-response-button-0');

              // Instructions 1
              this.click('#jspsych-instructions-next');

    });"
            )
        )
    )

}
