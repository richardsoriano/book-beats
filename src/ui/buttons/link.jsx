import Button from './'

export default function LinkButton({ children, ...rest }) {
  return (
    <Button {...rest} className='px-6 py-2 text-black'>
      {children}
    </Button>
  )
}
