import Head from 'next/head'
export default function Page({ children, title, description }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
      </Head>
      {children}
    </div>
  )
}
