library(conflicted)
library(dotenv)
library(drake)
library(tidyverse)
library(shiR)
library(htmltools)
library(poibin)
library(colorspace)
library(jaysire)
library(here)
library(jsonlite)
library(lubridate)
library(js)
library(magick)
library(rmarkdown)
library(knitr)
library(papaja)
library(janitor)
library(MOTE)
library(lme4)
library(patchwork)
library(webshot)
library(slider)
library(webdriver)
library(zip)
library(pwr)
library(htmlTable)
library(english)
library(RVerbalExpressions)
library(afex)
library(faux)
library(broom.mixed)
library(simr)
library(binom)
library(emmeans)
library(progress)
library(quantmod)
library(xaringanExtra)
library(effectsize)
library(RefManageR)
library(printy)
library(readtext)
library(mgsub)
library(bookdown)
library(yaml)

conflict_prefer("filter", "dplyr")
conflict_prefer("flatten", "purrr")
conflict_prefer("validate", "jsonlite")
conflict_prefer("zip", "zip")
conflict_prefer("last", "dplyr")
conflict_prefer("test", "emmeans")
