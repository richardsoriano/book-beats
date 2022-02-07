import { filterJudges } from '../bookScoreResults/helpers'
import SelectField from 'ui/select-field'

export default function attachJudges({
  filteredCategories,
  bag,
  setBag = () => {},
  judgeAssignments,
}) {
  // readers need to be filtered by judge.preferences.categories
  // How to prevent too many books assigned to each person
  // How to show error if too many books are assigned?

  const filteredJudges = filterJudges(judgeAssignments, filteredCategories)
  const names = filteredJudges.map((judgeAssignment) => judgeAssignment.judge)
  // console.log('filtered juges', filteredJudges)

  return (
    <div>
      <SelectField
        options={names}
        value={bag.assigned}
        onChange={(assigned) => setBag((prev) => ({ ...prev, assigned }))}
      />
    </div>
  )
}
