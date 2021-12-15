import Page from '@/features/page'

export default function Homepage({}) {
  return (
    <Page>
      <h1>Hello world.</h1>
    </Page>
  )
}

export function getServerSideProps() {
  return {
    props: {},
  }
}
