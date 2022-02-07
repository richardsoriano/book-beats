import dbPromise, { jsonify } from '@/modules/mongodb'
import AdminBagsJudges from '@/features/admin/bags/judges'
import readers from '@/data/readers'

export default function AdminBagsJudgesPage({ bags, books, judgeAssignments }) {
  return (
    <AdminBagsJudges
      books={books}
      bags={bags}
      judgeAssignments={judgeAssignments}
      readers={readers}
    />
  )
}

function aggregateBookAssignments(readers) {
  const books = readers
    .flatMap((reader) => reader.assignments)
    .flatMap((assignment) => assignment.book)
    .reduce((acc, book) => {
      return acc.map((book) => book._id).includes(book._id)
        ? acc
        : [...acc, { ...book, round: 2 }]
    }, [])

  return books.reduce((acc, book) => {
    const assigned = readers.flatMap((reader) =>
      reader.assignments.filter(
        (assignment) => assignment.book._id === book._id
      )
    )
    const reviewed = readers.flatMap((reader) =>
      reader.assignments.filter(
        (assignment) =>
          assignment.book._id === book._id && assignment.reviewedOn
      )
    )
    const scores = readers.flatMap((reader) =>
      reader.assignments
        .filter(
          (assignment) =>
            assignment.book._id === book._id && assignment.reviewedOn
        )
        .reduce((acc, assignment) => {
          return [...acc, assignment.review.creativity]
        }, [])
    )

    const scoresAvg = (
      scores.reduce((acc, score) => acc + score, 0) / scores.length
    ).toFixed(2)

    return [
      ...acc,
      {
        ...book,
        score: scoresAvg,
        assignedCount: assigned.length,
        reviewedCount: reviewed.length,
        status:
          assigned.length === reviewed.length ? 'Completed' : 'In progress',
      },
    ]
  }, [])
}
function aggregateBags(bags, readers) {
  const judges = readers.filter((reader) => reader.role.includes('judge'))
  const assignedArray = judges.map((judge) => judge.name)

  const bagsJudges = bags.reduce((acc, bag) => {
    return assignedArray.includes(bag.assigned) ? [...acc, { ...bag }] : acc
  }, [])

  return bagsJudges.reduce((acc, bag) => {
    return [
      ...acc,
      {
        _id: bag._id,
        name: bag.name,
        category: bag.category,
        books: bag.books,
        numBooks: bag.books.length,
        assigned: bag.assigned,
        pickupStatus: bag.pickupStatus,
      },
    ]
  }, [])
}

function aggregateJudgeAssignments(assignments) {
  const assignmentsJudges = assignments.map((assignment) => ({
    judge: assignment.name,
    role: assignment.role,
    preferences: assignment.preferences,
    max: assignment.preferences.maxNumberOfBooks,
    assignedCount: assignment.assignments.length,
    completedCount: assignment.assignments.filter(
      (assignment) => assignment.reviewedOn !== null
    ).length,
    availableCount:
      assignment.preferences.maxNumberOfBooks - assignment.assignments.length,
    categories: assignment.preferences.categories,
  }))

  return assignmentsJudges.filter((assignmentJudge) =>
    assignmentJudge.role.includes('judge')
  )
}

export async function getServerSideProps(ctx) {
  const dbConnection = await dbPromise
  const collection = await dbConnection.db().collection('bags')
  const bags = await collection.find({}).toArray()

  return {
    props: {
      bags: aggregateBags(jsonify(bags), readers),
      books: aggregateBookAssignments(readers),
      judgeAssignments: aggregateJudgeAssignments(readers),
    },
  }
}
