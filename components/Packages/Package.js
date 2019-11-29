import { Fragment, useEffect } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { Tabs } from 'antd'

import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  ViberShareButton,
  ViberIcon,
  TelegramShareButton,
  TelegramIcon
} from 'react-share'

import Body from '../Body'
const { TabPane } = Tabs

const SocialShare = styled('div')({
  display: 'flex',
  textAlign: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 20,
  div: {
    margin: '0 2px'
  }
})

const FeaturedImage = styled('div')({
  marginBottom: 20,
  img: {
    width: '100%'
  }
})

function renderPackage ({ node }, index) {
  return (
    <div key={index}>
      {node.name}
      <Link
        href='/travel-tours/packages/[slug]'
        as={`/travel-tours/packages/${node.slug}`}
      >
        <a>Read more</a>
      </Link>
    </div>
  )
}

const Package = ({ item, router }) => {
  const baseURL = process.env.BASE_URL
  const shareUrl = baseURL + router.asPath
  //   const tags = []

  useEffect(() => {
    console.log(item)
  }, [])

  return (
    <Fragment>
      <div>
        <h1 style={{ textAlign: 'center', padding: 20 }}>{item.name}</h1>
        {/* featured image */}
        <FeaturedImage>
          <img src={item.image.mediaItemUrl} />
        </FeaturedImage>
        {/* end featured image */}

        <div style={{ marginBottom: 20 }}>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: 25
            }}
          >
            {item.onSale ? (
              <div>
                <del>{item.regularPrice}</del> <strong>{item.salePrice}</strong>
              </div>
            ) : (
              <strong>{item.regularPrice}</strong>
            )}
            <div />
          </div>
        </div>

        {/* Social share */}
        <SocialShare>
          <FacebookShareButton url={shareUrl} quote={item.name}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <TwitterShareButton url={shareUrl}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <WhatsappShareButton url={shareUrl}>
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
          <ViberShareButton url={shareUrl}>
            <ViberIcon size={32} round />
          </ViberShareButton>
          <TelegramShareButton url={shareUrl}>
            <TelegramIcon size={32} round />
          </TelegramShareButton>
        </SocialShare>
        {/* end social share */}
        {/* hashtags */}
        {/* <div style={{ display: 'flex' }}>
          {item.tags &&
            tags.map((item, index) => (
              <div style={{ marginRight: 5 }} key={index}>
                <strong>#{item}</strong>
              </div>
            ))}
        </div> */}
        {/* end hashtags */}
        <Tabs defaultActiveKey='1'>
          <TabPane tab='Inclusions' key='1'>
            {item.shortDescription && <Body>{item.shortDescription}</Body>}
          </TabPane>

          {item.package.packageItinerary && (
            <TabPane tab='Itinerary' key='2'>
              <Body>{item.package.packageItinerary}</Body>
            </TabPane>
          )}

          {item.package.remarks && (
            <TabPane tab='Remarks' key='3'>
              <Body>{item.package.remarks}</Body>
            </TabPane>
          )}

          {item.package.termsOfPayment && (
            <TabPane tab='Payment terms' key='4'>
              <Body>{item.package.termsOfPayment}</Body>
            </TabPane>
          )}

          {item.package.departureDates && (
            <TabPane tab='Departure Dates' key='5'>
              <Body>{item.package.departureDates}</Body>
            </TabPane>
          )}
        </Tabs>

        {/* info */}
        <div>
          <ul>
            <li>Travel Code: {item.travel.travelCode}</li>
            <li>Travel Validity: {item.travel.travelValidity} </li>
          </ul>
        </div>
        {/* end info */}
      </div>
      <div>
        <h2>Related Packages</h2>
        <div>
          {item.related.edges.length && item.related.edges.map(renderPackage)}
        </div>
      </div>
    </Fragment>
  )
}

export default Package
