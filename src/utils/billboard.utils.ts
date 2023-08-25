

const queryBuilder = (params) => {
    return `
        USE ${params.db_name};
        SELECT ${params.db_table_column_name} as billboard_value
        FROM ${params.db_table_name} 
    `
}   


export {
    queryBuilder
}