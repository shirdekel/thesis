##' @title Screenshots alignment 8

##' @return
##' @author Shir Dekel
##' @export
get_screenshots_alignment_8 <- function() {
  file_name_materials <-
    get_file_name_materials_alignment_8()

  materials_directory <-
    file.path("inst", "materials", "alignment", "experiment8")

  file_path_materials <-
    get_file_path_materials(materials_directory, file_name_materials)

  pre_experiment <-
    str_c(
      "this.click('#jspsych-instructions-next');",
      str_c(
        "this.click('.jspsych-btn');" %>%
          rep(3),
        collapse = "\n"
      ),
      sep = "\n"
    )

  casper_calls_chronological <-
    c(
      pre_experiment,
      "this.click('.jspsych-btn');" %>%
        rep(4)
    ) %>%
    slide(~., .before = Inf) %>%
    map_chr(
      ~ str_c(
        .,
        collapse = "\n"
      )
    )

  casper_calls <-
    casper_calls_chronological %>%
    .[
      c(
        # instructions implicit/explicit reliability
        1 %>%
          rep(2),
        # interstitial 1
        2,
        # interstitial 1
        4,
        # reliability amount low alignment low reliability explicit
        3,
        # reliability amount high alignment low reliability explicit
        5,
        # reliability amount low alignment low reliability implicit
        3,
        # reliability amount high alignment low reliability implicit
        5,
        # reliability amount low alignment high x project variation (5)
        3 %>%
          rep(5),
        # reliability amount high alignment high x project variation (5)
        5 %>%
          rep(5)
      )
    ]

  alignment <-
    c(
      "low" %>%
        rep(8),
      "high" %>%
        rep(10)
    )

  reliability_type <-
    c(
      "implicit",
      "explicit" %>%
        rep(5),
      "implicit" %>%
        rep(12)
    )

  project_variation <-
    c(
      1 %>%
        rep(8),
      seq_len(5) %>%
        rep(2)
    )

  webshot_eval <-
    list(
      casper_calls,
      alignment,
      reliability_type,
      project_variation
    ) %>%
    pmap_chr(
      function(casper_calls, alignment, reliability_type, project_variation) {
        str_c(
          "casper.thenOpen(this.getCurrentUrl() + '",
          "?test=true",
          "&display_variation=1",
          "&business_name_variation=1",
          "&alignment=",
          alignment,
          "&reliability_type=",
          reliability_type,
          "&project_variation=",
          project_variation,
          str_c(
            "', function() {", casper_calls, "});",
            sep = "\n"
          )
        )
      }
    )

  screenshot_components <-
    lst(
      file_path_materials,
      webshot_eval
    )

  return(screenshot_components)
}
