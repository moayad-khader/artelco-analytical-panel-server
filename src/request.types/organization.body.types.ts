interface createBody {
  organization_name: string;
  organization_description: string;
}

interface updateBody extends createBody {
  organization_id: number
}

export {
  createBody,
  updateBody
}
