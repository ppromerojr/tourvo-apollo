import dynamic from 'next/dynamic'
import { useState, useCallback } from 'react'
import Link from 'next/link'

const PackagesList = dynamic(import('./Packages'))
const Categories = dynamic(import('./Categories'))

function PackagePageTemplate ({ category, tag, type, loading, ...rest }) {
  let [selectedCategory, setCategory] = useState({})
  const [keyword, setKeyword] = useState()
  const [onSale, setOnSale] = useState(null)
  const [filter, setFilter] = useState(null)

  const onSearch = useCallback(value => {
    setKeyword(value)
  }, [])

  const onChangeFilter = useCallback(event => {
    const value = event.target.value
    var optionElement = event.target.childNodes[event.target.selectedIndex]
    const order = optionElement.getAttribute('order')
    const data = {
      field: value,
      order
    }
    if (order) {
      setFilter(data)
    }
  }, [])

  if (category && category.edges) {
    category = category.edges[0].node
  }

  if (tag && tag.edges) {
    tag = tag.edges[0].node
  }

  const renderPageTitle = () => {
    if (type === 'tag') {
      return (
        <h1 style={{ marginRight: 10 }}>
          {loading ? 'Spinning...' : `#${tag.name}`}
        </h1>
      )
    }

    if (type === 'category') {
      return (
        <h1 style={{ marginRight: 10 }}>
          {loading ? selectedCategory.name : category.name}
        </h1>
      )
    }

    return (
      <h1>
        <Link href='/travel-tours/packages' as='/travel-tours/packages'>
          <a>Packages</a>
        </Link>
      </h1>
    )
  }

  return (
    <div>
      {/* Title */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {renderPageTitle()}
      </div>
      {/* end Title */}

      {/* Search bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 20,
          width: '100%'
        }}
      >
        {/* <Affix style={{ width: '100%' }} offsetTop={0}>
          <Search
            placeholder={`Search for Hotel, City or Location`}
            onSearch={onSearch}
            size='large'
            style={{ width: '100%' }}
          />
        </Affix> */}
      </div>
      {/* end search bar */}

      {/* Categories */}
      {type != 'tag' && (
        <div
          style={{
            width: '100%',
            overflow: 'scroll'
          }}
        >
          <Categories onClick={setCategory} />
        </div>
      )}
      {/* categories */}

      {/* Start filter */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 20,
          marginBottom: 20
        }}
      >
        {/* Sale */}
        {/* <div style={{ display: 'flex', alignItems: 'center' }}>
          <Switch
            unCheckedChildren='Sale'
            checkedChildren='Sale'
            onChange={value => setOnSale(value)}
          /> 
        </div>
         */}
        {/* end sale */}
        <div>
          <div style={{ marginBottom: 2, fontSize: 12, textAlign: 'right' }}>
            Sort by:
          </div>
          <select onChange={onChangeFilter}>
            <option value='DATE' order='DESC'>
              Date
            </option>
            <option value='PRICE' order='ASC'>
              Cheapest first
            </option>
            <option value='PRICE' order='DESC'>
              Most expensive first
            </option>
          </select>
        </div>
      </div>
      {/* end filter */}

      <PackagesList
        keyword={keyword}
        onSale={onSale}
        filter={filter}
        {...rest}
      />
    </div>
  )
}

export default PackagePageTemplate
