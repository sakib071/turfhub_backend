import { FilterQuery, Query } from 'mongoose'
interface TotalQueries {
  isDeleted: boolean
}
class QueryBuilder<T> {
  public modelQuery: Query<T[], T>
  public query: Record<string, unknown>

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery
    this.query = query
  }

  search(searchableFields: string[]) {
    const searchTerm = this?.query?.searchTerm as string | undefined

    if (searchTerm) {
      const searchConditions: Array<FilterQuery<T>> = searchableFields.map(
        (field) => {
          // Check if we're searching for a related field (e.g., "turf.name")
          if (field.includes('.')) {
            const [relation, fieldName] = field.split('.')
            // Populate the relation if it's not already populated
            this.modelQuery = this.modelQuery.populate({
              path: relation, // e.g., "turf"
              select: fieldName, // e.g., "name"
            })
            return {
              [`${relation}.${fieldName}`]: {
                $regex: searchTerm,
                $options: 'i',
              },
            } as FilterQuery<T>
          } else {
            // Regular field search
            return {
              [field]: { $regex: searchTerm, $options: 'i' },
            } as FilterQuery<T>
          }
        },
      )

      this.modelQuery = this.modelQuery.find({
        $or: searchConditions,
      })
    }

    return this
  }

  filter() {
    const queryObj = { ...this.query } // copy

    // Filtering
    const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields']
    excludeFields.forEach((el) => delete queryObj[el])

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>)

    return this
  }

  sort() {
    const sort =
      (this?.query?.sort as string)?.split(',')?.join(' ') || '-createdAt'
    this.modelQuery = this.modelQuery.sort(sort as string)

    return this
  }

  paginate() {
    const page = Number(this?.query?.page) || 1
    const limit = Number(this?.query?.limit) || 5
    const skip = (page - 1) * limit

    this.modelQuery = this.modelQuery.skip(skip).limit(limit)

    return this
  }

  fields() {
    const fields =
      (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v'

    this.modelQuery = this.modelQuery.select(fields)
    return this
  }

  async countTotal() {
    const totalQueries = this.modelQuery.getFilter() as TotalQueries
    totalQueries.isDeleted = false // Add the isDeleted property
    const total = await this.modelQuery.model.countDocuments(totalQueries)

    const page = Number(this?.query?.page) || 1
    const limit = Number(this?.query?.limit) || 10
    const totalPage = Math.ceil(total / limit)

    return {
      page,
      limit,
      total,
      totalPage,
    }
  }
}

export default QueryBuilder
