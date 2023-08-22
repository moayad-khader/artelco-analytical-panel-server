interface createBody {
    db_table_column_id: number
    db_table_filter_id: number
    billboard_title_ar: string
    billboard_title_en: string
    billboard_icon: string
    billboard_type: string
    billboard_metric_type: string
    billboard_threshold_warning: number
    billboard_threshold_danger: number
  }
  
  interface updateBody extends createBody {
    billboard_id: number
  }
  
  export { createBody, updateBody }
  