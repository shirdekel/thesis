##' @title Get instructions for E4

##' @return
##' @author Shir Dekel
##' @export
get_instructions_experiment4 <- function() {

  instructions_naive <-
    div(
      p(
        "Imagine that you are an executive in a large company composed of many individual businesses. You will see one project from one of the businesses and have to decide whether you would like to invest in it."
      ),
      p(
        "Imagine that making a good investment decision will result in you receiving a generous bonus and a potential promotion, and that doing poorly will result in you receiving a large pay cut and a potential demotion. We want to know what choices you would actually make in this scenario."
      )
    ) %>%
    as.character()

  instructions_aware <-
    div(
      p(
        "Imagine that you are an executive in a large company composed of many individual businesses. You will see 20 projects from these businesses and have to decide whether you would like to invest in them."
      ),
      p(
        "Imagine that making good investment decisions will result in you receiving a generous bonus and a potential promotion, and that doing poorly will result in you receiving a large pay cut and a potential demotion. We want to know what choices you would actually make in these scenarios."
      )
    ) %>%
    as.character()

  awareness_condition <- c("naive", "aware")

  instructions_experiment4 <-
    list(
      instructions_naive,
      instructions_aware
    ) %>%
    list(awareness_condition) %>%
    pmap(
      ~ trial_instructions(
        pages = c(
          "We will now give you the instructions for the task. Use the arrow buttons to browse these instructions",
          .x,
          "Press the 'Next' button to begin."
        ),
        show_clickable_nav = TRUE,
        data = insert_property(stage = "instructions")
      ) %>%
        build_timeline() %>%
        display_if(fn_data_condition(awareness == !!.y))
    )

  return(instructions_experiment4)

}
