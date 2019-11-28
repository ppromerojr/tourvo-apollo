import dynamic from 'next/dynamic'
import { Affix, Input } from 'antd'
import { useState, useCallback, useEffect } from 'react'
import Link from 'next/link'

const PackagesList = dynamic(import('./Packages'))
const Categories = dynamic(import('./Categories'))

const { Search } = Input

function PackagePageTemplate ({ category, isCategoryPageLoading, ...rest }) {
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

  return (
    <div>
      <h1>
        <Link href='/travel-tours/packages' as='/travel-tours/packages'>
          <a>Packages</a>
        </Link>
      </h1>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 20,
          width: '100%'
        }}
      >
        <Affix style={{ width: '100%' }} offsetTop={0}>
          <Search
            placeholder='Search for Hotel, City or Location'
            onSearch={onSearch}
            size='large'
            style={{ width: '100%' }}
          />
        </Affix>
      </div>
      <div
        style={{
          width: '100%',
          overflow: 'scroll'
        }}
      >
        <Categories onClick={setCategory} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <label>
            Sale
            <input
              type='checkbox'
              onClick={event => {
                setOnSale(event.target.checked)
              }}
            />
          </label>
        </div>
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
      <div>
        {category && (
          <h1 className='cat_name'>
            {isCategoryPageLoading ? selectedCategory.name : category.name}
          </h1>
        )}
      </div>

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
