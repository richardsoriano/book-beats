import PrimaryButton from './primary'
import LinkButton from './link'

export { PrimaryButton, LinkButton }

export default function Button({ children, ...rest }) {
  return <button {...rest}>{children}</button>
}
