##' @title Get plan parameters
##'
##' To be used in static branching functions

##' @return
##' @author Shir Dekel
##' @export
get_parameters <- function() {

  thesis_project <-
    c(
      c("aggregation") %>%
        rep(3)
      # "alignment"
    )

  experiment_number <-
    c(
      2,
      3,
      4
      # 8
    )

  gamble_n <-
    c(
      10 %>%
        rep(2),
      20
      # NA
    )

  get_plot <-
    syms(str_c("get_plot_experiment", experiment_number))

  get_results <-
    syms(str_c("get_results_experiment", experiment_number))

  import_data <-
    syms(c(
      "import_data_server" %>%
        rep(3)
    ))

  data_directory <-
    c(
      here("inst", "extdata", "psychsydexp") %>%
        rep(3)
      # NA
    )

  data_clean_test <-
    c(
      FALSE %>%
        rep(3)
      # NA
    )

  prolific_filter <-
    list(
      "datetime > '2020-07-28'",
      list(
        c("datetime > '2020-09-17'", "datetime < '2020-09-18'"),
        c("datetime > '2020-09-18'", "similarity == 'low'"),
        c("datetime > '2020-09-18'", "similarity == 'high'")
      ),
      "datetime > '2020-07-28'"
      # NA
    )

  prolific_filter_label <-
    list(
      list(character(0)),
      list(
        character(0),
        "similarity_low",
        "similarity_high"
      ),
      list(character(0))
      # NA
    )

  experiment_directory <-
    get_experiment_directory(thesis_project, experiment_number)

  get_experiment_components <-
    syms(
      str_c("get_experiment_components", experiment_number)
    )

  screenshot_components <-
    list(
      get_screenshots_experiment2(),
      get_screenshots_experiment3(),
      get_screenshots_experiment4()
      # NA
    )

  materials_directory <-
    get_materials_directory(thesis_project, experiment_number)

  memo_type <-
    c("materials", "summary")

  memo_extension <-
    c("Rmd", "pdf")

  memo_path <-
    list(
      experiment_number,
      thesis_project
    ) %>%
    pmap(
      function(experiment_number_value, thesis_project_value)
        memo_type %>%
        map(
          function(memo_type_value)
            memo_extension %>%
            map(
              function(memo_extension_value)
                get_memo_path(
                  thesis_project_value,
                  experiment_number_value,
                  memo_type_value,
                  memo_extension_value
                )
            ) %>%
            set_names(memo_extension)
        ) %>%
        set_names(memo_type)
    )

  parameters <-
    tibble(
      thesis_project,
      experiment_number,
      gamble_n,
      get_plot,
      get_results,
      import_data,
      data_directory,
      data_clean_test,
      prolific_filter,
      prolific_filter_label,
      experiment_directory,
      get_experiment_components,
      screenshot_components,
      memo_path,
      materials_directory
    )

  return(parameters)
}
