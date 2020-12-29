#
# This generates plotly treemap object from an S3 table object.
#
# Example:
# fig1 <- table_to_plotly_treemap()
# data(gss_cat)
# gss_cat %>% xtabs(formula=~marital+age+relig,data=.) %>% table_to_plotly_treemap() 
#
#
# Works around the following limits of existing packages:
#  - Treemapify supports plotting treemaps from dataframes but only three levels of
#    trees are supported, and the plots are not interactive.
# -  Rplotly supports treemap traces, but does not include px.treemap or other operator toc onvertg
#    data frames. This is a substitute for px.treemap. 

library(tidyverse)
library(magrittr)
library(plotly)

table_to_plotly_treemap <- function(the_table=Titanic, root_label="Total", ... ) {
  
  ## setup
  the_table <- as.table(the_table)
  max_depth <- length(dim(the_table))
  table_tibble <- as_tibble(the_table)
  
  ## root node 
  treemap_table <- tibble (
    labels=root_label,
    ids="root",
    parents="",
    values= table_tibble %>% ungroup() %>% summarise(n=sum(n)) %>% unlist()
  )
  
  for (depth in 1:max_depth) {
    treemap_table_leaf <- table_tibble %>%
      group_by(across(1:depth)) %>% 
      summarize (values = sum(n)) %>%
      ungroup() %>% 
      rowwise() %>% 
      transmute(
        ids=paste(c_across(1:depth),collapse="-"),
        labels=paste(c_across(depth),names(table_tibble)[depth], sep=":"),
        parents = ifelse(depth==1, "root",paste(c_across(1:(depth-1)),collapse="-")),
        values=values
      )
    treemap_table %<>% bind_rows(treemap_table_leaf)
  } 
  
  print (treemap_table)
  
  fig <- plot_ly(
    type='treemap',
    ids=treemap_table$ids,
    labels=treemap_table$labels,
    parents=treemap_table$parents,
    values=treemap_table$values,
    branchvalues="total"
  )
  return(fig)
}
