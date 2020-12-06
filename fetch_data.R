library(gsubfn)

data_path <- "./mono_data"

###  DOAB
list[mono_fetch_doab, mono_load_doab] <-
  local({
    dest_file <- "doab.csv"
    mono_fetch <- function() {
      source_url <-  "http://www.doabooks.org/doab?func=csv"
      download.file(source_url, destfile = file.path(data_path, dest_file))
    }
    mono_load <- function() {
      require(readr)
      tmp_df <- read_csv(file.path(data_path, dest_file))
      return(tmp_df)
    }
    return(list(mono_fetch, mono_load))
  })

### OAPC

list[mono_fetch_oapc, mono_load_oapc] <-
  local({
    dest_file <- "oapc_bpc.csv"
    mono_fetch <- function() {
      source_url <-  "https://raw.githubusercontent.com/OpenAPC/openapc-de/master/data/bpc.csv"
      download.file(source_url, destfile = file.path(data_path, dest_file))
    }
    mono_load <- function() {
      require(readr)
      tmp_df <- read_csv(file.path(data_path, dest_file))
      return(tmp_df)
    }
    return(list(mono_fetch, mono_load))
  })

### HATHI

list[mono_fetch_hathi, mono_load_hathi] <-
  local({
    dest_file <- "hathi.csv.gz"
    mono_fetch <- function() {
      require(rvest)
      require(jsonlite)
      hathi_dataset_url <- "https://www.hathitrust.org/hathifiles"
      hathi_json_index_name <-  "hathi_file_list.json"
      files_pg <- read_html(hathi_dataset_url)
      json_url <- files_pg %>%
         html_nodes(xpath = paste('//a[text()=', hathi_json_index_name, ']/@href', 
                                  sep = "'")) %>%
         html_text()
      json_tempfile <- tempfile(fileext=".json")
      download.file(json_url,destfile=json_tempfile)
      hathi_json <- read_json(json_tempfile,simplifyVector=TRUE)
      source_url <- hathi_json %>%
        filter(full) %>% arrange(created) %>% tail(n=1) %>% select(url) %>% as.character()
      tmp_timeout <- getOption('timeout')
      options(timeout=300)
      download.file(source_url, destfile = file.path(data_path, dest_file))
      options(timeout=tmp_timeout)
    }
    mono_load <- function() {
      require(readr)
      tmp_df <- read_csv(file.path(data_path, dest_file))
      return(tmp_df)
    }
    return(list(mono_fetch, mono_load))
  })









