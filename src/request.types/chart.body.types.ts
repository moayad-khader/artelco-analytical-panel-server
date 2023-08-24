interface createBody {
  db_table_column_id: number
  db_table_filter_id: number
  chart_title_ar: string
  chart_title_en: string
  chart_dependency: string
  chart_type: string
}

interface updateBody extends createBody {
  chart_id: number
}

export { createBody, updateBody }
