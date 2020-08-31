##' @title Save mock data

##' @param session
##'
##' @param data_folder
##'
##' @return
##' @author Shir Dekel
##' @export
save_data_mock <- function(session, data_folder) {

  session$readLog() # For some reason without this the next script doesn't show the first time it is called
  session$executeScript("console.log(jsPsych.data.get().csv())")
  data <-
    session$readLog()

  file_id <-
    str_c(
      "data",
      data$timestamp %>%
        str_replace_all("[ :]", "-"),
      jaysire:::get_alphanumeric(10),
      sep = "_")

  read_csv(
    data$message %>%
      str_remove(" \\(:\\)")
  ) %>%
    mutate(dateCreated = data$timestamp %>%
             format("%d/%m/%Y %H:%M:%S")) %>%
    write_csv(
      file.path(data_folder, str_c(file_id, ".csv"))
    )

}
