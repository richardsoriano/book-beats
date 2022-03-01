import Button from './'

export default function PrimaryButton({ children, ...rest }) {
  return (
    <Button
      {...rest}
      className='px-6 py-2 text-black border border-blue-500 rounded-sm shadow'
    >
      {children}
    </Button>
  )
}
