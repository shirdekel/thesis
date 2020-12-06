##' @title Get instructions for alignment 8

##' @return
##' @author Shir Dekel
##' @export
get_instructions_alignment_8 <- function() {
  instructions_main <-
    c(
      "For each project, you will see a range of possible NPVs alongside a 'midpoint'. The range literally represents the range of plausible outcomes (a uniform distribution), but the midpoint is the best guess, and hence is the same as a single NPV. That is, all values within the range are equally likely, but the midpoint is still the best guess because it is the value that is closest to all the other values.",
      "For each project, you will see an NPV, alongside a statement of whether NPV is considered to be a reliable (or an unreliable) metric for that project. There are usually a range of plausible NPV outcomes, so when NPV is considered to be \"reliable\" this means that the range of possible values is relatively narrow (indicating high confidence in the estimate). Conversely, when NPV is considered to be \"unreliable\", this means that the range of possible values is relatively wider (indicating low confidence in the estimate)."
    ) %>%
    map(
      function(reliability_type) {
        c(
          "Imagine that you are a CEO of a large company composed of many individual businesses.",
          "You will be shown information about a number of projects that your company is considering to invest in. Each project is independent of the others. Some specific information about the project itself is provided. In addition to those numbers, you will find each project's net present value (NPV), which is the company's estimation of the future returns of the project. An NPV that is greater than 0 (zero) indicates that there is an expectation of profit. The higher the NPV, the better the expectations for each project.",
          reliability_type,
          "Your task is to rank the projects in order of investment priority and decide how to allocate the available budget (as a percentage) between them."
        ) %>%
          map_chr(
            ~ .x %>%
              p() %>%
              as.character()
          ) %>%
          HTML()
      }
    )

  project_test <-
    c(
      "Test yourself on the above instructions. If Project A has an NPV of $100, and Project B has an NPV of $200, write in the following text box the name of the project that has a greater expectation of profit: "
    ) %>%
    get_survey_text(
      name = "project_test",
      prefix = "Project ",
      required = NA,
      maxlength = 1,
      size = 2
    )

  instructions_html <-
    instructions_main %>%
    map(
      ~ div(
        .x,
        project_test
      ) %>%
        as.character()
    )

  instructions <-
    list(
      instructions_html,
      c("implicit", "explicit")
    ) %>%
    pmap(
      ~ trial_generic(
        "survey-html-form",
        html = .x,
        data = insert_property(stage = "instructions")
      ) %>%
        build_timeline() %>%
        display_if(fn_data_condition(reliability_type == !!.y))
    )

  return(instructions)
}
