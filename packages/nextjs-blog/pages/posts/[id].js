import Head from 'next/head'
import Layout, { siteTitle } from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Date from '../../components/date'

export default function Post({ postData }) {
  return (
    <Layout home>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <section className={utilStyles.headingXl}>
      <p>I'm who I am!</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://www.nextjs.cn/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
            <li className={utilStyles.listItem} key={postData.id}>
              <article>
                <h1 className={utilStyles.headingMd}>{postData.title}</h1>
                <div>{postData.id}</div>
                <div className={utilStyles.lightText}>
                  <Date dateString={postData.date}></Date>
                </div>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
              </article>
            </li>
        </ul>
      </section>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  // const allPostsData = getSortedPostsData()
  const postData = await getPostData(params.id);
  return {
    props: {
      // allPostsData,
      postData,
    },
  }
}
