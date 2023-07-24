import { useEffect } from "react";
import { useRouter } from "next/router";

const IndexPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/view-users");
  });

  return null;
};

export async function getServerSideProps() {
  return {
    props: {},
  };
}

export default IndexPage;
