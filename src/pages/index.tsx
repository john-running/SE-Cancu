import Countries from '@/components/commercelayer/Countries';
import { cms } from '@/utils/cms';

const IndexPage = ({ countries }: any) => {
  return (
    <div className="pb-10 px-5 md:px-0 max-w-screen-lg mx-auto container">
      <Countries items={countries} searchBy={undefined} />
    </div>
  );
};

export const getStaticProps = async () => {
  const countries = await cms().allCountries('en-us');
  return {
    props: {
      countries,
    },
  };
};

export default IndexPage;
