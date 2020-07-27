##' @title Conditional "other" text input display

##' @return
##' @author Shir Dekel
##' @export
check_other <- function() {

  c("function checkOther(val, id){
 var element=document.getElementById(id);
 if(val=='Other')
   element.style.display='block';
 else
   element.style.display='none';
}")

}
