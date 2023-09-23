import Head from "next/head";

interface Props {
  title: string;
  children: JSX.Element;
}

export default function Layout({ children, title }: Props) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="og:title" content={title} />
        <meta name="description" content={title} />
        <meta property="og:description" content={title} />
      </Head>
      <main className="mx-[20px] md:mx-[100px] text-gray-700">{children}</main>
    </>
  );
}
