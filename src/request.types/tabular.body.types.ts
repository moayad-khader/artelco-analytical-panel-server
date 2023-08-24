interface createBody {
  db_table_id: number
  tabular_title_ar: string
  tabular_title_en: string
}

interface updateBody extends createBody {
  tabular_id: number
}

export { createBody, updateBody }
