export default function Homepage({}) {
  return (
    <div className='mt-16 container mx-auto'>
      <h1>Hello world.</h1>
    </div>
  );
}

export function getServerSideProps() {
  return {
    props: {},
  };
}
