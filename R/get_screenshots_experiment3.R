##' @title screenshots E3

##' @return
##' @author Shir Dekel
##' @export
get_screenshots_experiment3 <- function() {

  file_paths_materials_experiment3 <-
    here("inst", "materials", "experiment3")

  file_path_project_choice <-
    file_paths_materials_experiment3 %>%
    get_project_choice_paths()

  file_path_instructions <-
    file.path(file_paths_materials_experiment3,
              "instructions_experiment3.png")

  file_paths_experiment3 <-
    here("inst", "jspsych", "experiment3", "experiment")

  file.path(file_paths_experiment3, "index.html") %>%
    webshot(
      file = file_path_instructions,
      selector = "#jspsych-content",
      eval =
        "casper.then(function() {
        /*
        // Welcome
        this.click('#jspsych-instructions-next');

        // PIS 1
        this.click('#jspsych-instructions-next');

        // PIS 2
        this.click('#jspsych-instructions-next');

        // PIS 3
        this.click('#jspsych-instructions-next');

        // Consent check
        this.click('#consent_checkbox');

        // Consent start
        this.click('#start');

        // Enter Prolific ID
        this.sendKeys('#prolific, 'test12341234123412341234');

        // Prolific ID continue
        this.click('#jspsych-survey-html-form-next');

        // Feedback
        this.click('#jspsych-survey-html-form-next');

        // Enter age
        this.sendKeys('#age, '11');

        // Select language
        this.evaluate(function() {
        document.querySelector('select.language').selectedIndex = 2;
        });

        // Enter business education
        this.sendKeys('#business_edu, '1');

        // Enter business experience
        this.sendKeys('#business_exp, '1');

        // Demographics continue
        this.click('#jspsych-survey-html-form-next');

        */

        // Instructions 1
        this.click('#jspsych-instructions-next');

      });"
    )

  file_path_project_choice %>%
    imap(
      ~ file.path(file_paths_experiment3, "index.html") %>%
        webshot(
          file = .x,
          selector = "#jspsych-content",
          eval =
            str_c(
              "casper.thenOpen(this.getCurrentUrl() + '?similarity=high&project_variation=",
              .y,
              "', function() {
    // Instructions 1
    this.click('#jspsych-instructions-next');

    // Instructions 2
    this.click('#jspsych-instructions-next');

    // Instructions 3
    this.click('#jspsych-instructions-next');

    });"
            )
        )
    )

}
