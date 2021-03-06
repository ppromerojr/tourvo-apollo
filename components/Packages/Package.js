import { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'

import { Tags } from '../../utils/HttpClient'

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
import { Share } from 'react-feather'
import Lazy from '../Image'

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

const RelatedPackages = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gridGap: '10px'
})

const onWebShare = async item => {
  if (navigator.share) {
    const share = await navigator.share({
      title: item.name,
      text: item.name,
      url: window.location.href
    })

    console.log('share', share)
  }
}

const updateViewCount = async tagId => {
  return new Promise(async (resolve, reject) => {
    const request = await Tags.countView(tagId)
    // console.log('request', request)

    if (request.ok) {
      resolve(true)
    } else {
      reject()
    }
  })
}

function renderPackage ({ node }, index) {
  return (
    <div key={index}>
      <Link
        href='/travel-tours/packages/[slug]'
        as={`/travel-tours/packages/${node.slug}`}
      >
        <a>
          <FeaturedImage>
            <img async src={node.image.sourceUrl} />
          </FeaturedImage>
          <div> {node.name}</div>
          <div style={{ marginBottom: 10 }}>
            <div
              style={{
                width: '100%',
                display: 'flex',
                fontSize: 13
              }}
            >
              {node.onSale ? (
                <div>
                  <del>{node.regularPrice}</del>{' '}
                  <strong>{node.salePrice}</strong>
                </div>
              ) : (
                <strong>{node.regularPrice}</strong>
              )}
              <div />
            </div>
          </div>
        </a>
      </Link>
    </div>
  )
}

const Package = ({ item, router }) => {
  const baseURL = process.env.BASE_URL
  const shareUrl = baseURL + router.asPath
  const [isShareEnabled, setWebShare] = useState(false)
  //   const tags = []

  useEffect(() => {
    item.tags.nodes.forEach((node, index) => {
      updateViewCount(node.termTaxonomyId)
    })
  }, [item])

  useEffect(() => {
    if (navigator.share) {
      setWebShare(true)
    }
  }, [])

  return (
    <Fragment>
      <div>
        <h1 style={{ textAlign: 'center', padding: 20 }}>{item.name}</h1>
        {/* featured image */}
        <FeaturedImage>
          <Lazy>
            <img src={item.image.mediaItemUrl} />
          </Lazy>
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

          {isShareEnabled ? (
            <div>
              <button
                onClick={() => onWebShare(item)}
                style={{
                  backgroundColor: '#007890',
                  padding: 7,
                  borderRadius: '100%'
                }}
              >
                <Share size={20} color={'#FFF'} />
              </button>
            </div>
          ) : (
            <Fragment>
              <WhatsappShareButton url={shareUrl}>
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
              <ViberShareButton url={shareUrl}>
                <ViberIcon size={32} round />
              </ViberShareButton>
              <TelegramShareButton url={shareUrl}>
                <TelegramIcon size={32} round />
              </TelegramShareButton>
            </Fragment>
          )}
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

        <div>
          {item.shortDescription && (
            <Fragment>
              <h1>Inclusions</h1>
              <Body>{item.shortDescription}</Body>
            </Fragment>
          )}
        </div>

        <div>
          {item.package.packageItinerary && (
            <Fragment>
              <h1>Itinerary</h1>
              <Body>{item.package.packageItinerary}</Body>
            </Fragment>
          )}
        </div>

        <div>
          {item.package.packageItinerary && (
            <Fragment>
              <h1>Remarks</h1>
              <Body>{item.package.remarks}</Body>
            </Fragment>
          )}
        </div>

        <div>
          {item.package.termsOfPayment && (
            <Fragment>
              <h1>Payment Terms</h1>
              <Body>{item.package.termsOfPayment}</Body>
            </Fragment>
          )}
        </div>

        <div>
          {item.package.departureDates && (
            <Fragment>
              <h1>Departure Dates</h1>
              <Body>{item.package.departureDates}</Body>
            </Fragment>
          )}
        </div>

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
        <RelatedPackages>
          {item.related.edges.length && item.related.edges.map(renderPackage)}
        </RelatedPackages>
      </div>
    </Fragment>
  )
}

export default Package
