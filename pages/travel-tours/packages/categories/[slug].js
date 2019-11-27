import dynamic from 'next/dynamic'
import createPage from '../../../../components/Page/createPage'
import Categories from '../../../../components/Categories'
import { Affix, Input } from 'antd'
import { useState, useCallback, useRef } from 'react'

const PackagesList = dynamic(import('../../../../components/Packages'))

const { Search } = Input
const defaultFilter = {
    field: 'DATE',
    order: 'DESC'
}

function Packages({ data, loading, error, ...rest }) {
    const [keyword, setKeyword] = useState()
    const [onSale, setOnSale] = useState(null)
    const [filter, setFilter] = useState(defaultFilter)

    if (error) {
        return <div>error</div>
    }

    const onSearch = useCallback(value => {
        setKeyword(value)
    }, [])

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Packages</h1>
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
                <Categories />
            </div>
            <div >
                <div>
                    <label>
                        Sale
                <input
                            type='checkbox'
                            onClick={(event) => {
                                setOnSale(event.target.checked)
                            }}
                        />
                    </label>
                </div>
                <div>
                    <div style={{ marginBottom: 2, fontSize: 12, textAlign: 'right' }}>
                        Sort by:
            </div>
                    <select
                        onChange={event => {
                            const value = event.target.value
                            var optionElement =
                                event.target.childNodes[event.target.selectedIndex]
                            const order = optionElement.getAttribute('order')
                            const data = {
                                field: value,
                                order
                            }
                            setFilter(data)
                        }}
                    >
                        <option value='DATE' order='DESC'>  Date   </option>
                        <option value='PRICE' order='ASC'>   Cheapest first  </option>
                        <option value='PRICE' order='DESC'>  Most expensive first   </option>
                    </select>
                </div>
            </div>
            <PackagesList keyword={keyword} onSale={onSale} filter={filter} {...rest} />
        </div>
    )
}

Packages = createPage({
    slug: 'packages'
})(Packages)

export default Packages
