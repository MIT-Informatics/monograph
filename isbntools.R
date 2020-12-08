# setup python environment to use isbntools library
#
# see: https://pypi.org/project/isbntools/ 

library(tidyverse)
library(reticulate)

isbn_tools_init <- function() {
  conda_create("isbntools-env")
  conda_install(packages="r-reticulate")
  conda_install(packages="isbntools", pip=TRUE)
}

load_isbntools <-function() {
  use_condaenv("isbntools-env")
  ret_fun <-import("isbnlib")
  return(ret_fun)
}

isbntools <- local ({
  isbntools_ <- load_isbntools()
 
  isbntools_fun <- function(meth,x,...) {
    isbntools_[as.character(meth)](x,...)
  }
  safe_isbntools_fun <- possibly(isbntools_fun, otherwise=NA)
  safe_isbntools_list_fun <- function (meth,xlist,...) {
    return( 
      sapply(xlist, safe_isbntools_fun, meth=meth, ...,
             simplify=TRUE, USE.NAMES=FALSE )
    )
  }
  })
