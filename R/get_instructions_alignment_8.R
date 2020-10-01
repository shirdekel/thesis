##' @title Get instructions for alignment 8

##' @return
##' @author Shir Dekel
##' @export
get_instructions_alignment_8 <- function() {
    instructions_main <-
        c(
            "Imagine that you are a CEO of a large company composed of many individual businesses.",
            "You will be shown information about a number of projects that your company is considering to invest in. Some specific information about the project itself is provided. In addition to those numbers, you will find each project's net present value (NPV), which is the company's estimation of the future returns of the project. An NPV that is greater than 0 (zero) indicates that there is an expectation of profit. The higher the NPV, the better the expectations for each project.",
            "You will see a range of possible NPVs alongside a 'midpoint'. The range literally represents the range of plausible outcomes, but the midpoint is the best guess, and hence is the same as a single NPV value.",
            "Your task is to rank the projects and decide how to allocate the available budget between them."
        ) %>%
        map_chr(
            ~ .x %>%
                p() %>%
                as.character()
        ) %>%
        HTML() %>%
        div() %>%
        as.character()

    instructions <- trial_instructions(
        pages = c(
            "We will now give you the instructions for the task. Use the arrow buttons to browse these instructions",
            instructions_main,
            "Press the 'Next' button to begin."
        ),
        show_clickable_nav = TRUE,
        data = insert_property(stage = "instructions")
    )

    return(instructions)
}