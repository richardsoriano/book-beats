import Page from '@/ui/page'
export default function LandingPage() {
  return (
    <div className='mt-16 ml-6 container mx-auto '>
      <Page
        title='Welcome to Book Beats'
        description='This is to assist the administrator in the Montana Book Clubs'
      >
        <h1>Welcome to Book Beats</h1>
        <br />

        <p>
          Book Beats is created to assist the volunteers of the High Plains Book
          Awards for their annual book contest{' '}
        </p>
        <p>The admin and wrangler will be able to assign books, bags. </p>
        <p>
          Readers will be assigned 4 books of bags for the category they choose.
          Then they can rate them online.
        </p>
        <p>Judges will rate and choose the top 3 winners for each category</p>
        <p className='text-sm'>Created by Richard Soriano 2022</p>
      </Page>
    </div>
  )
}
