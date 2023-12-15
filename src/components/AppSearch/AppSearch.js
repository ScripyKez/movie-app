import React, { useState } from 'react'
import Search from 'antd/es/input/Search'
import debounce from 'lodash.debounce'

export default function AppSearch({ currentList, searchRequest }) {
  const [searchValue, setSearchValue] = useState('')
  const [warningSearch, setWarningSearch] = useState(false)

  const clearSearch = () => setSearchValue('')

  const debouncedSearchRequest = debounce(searchRequest, 1500)
  const searchRequestDebounced = (e) => {
    setSearchValue(e.target.value)
    debouncedSearchRequest(e.target.value)
  }

  return currentList === 'search' ? (
    <Search
      placeholder="Type to find a film"
      onChange={(e) => {
        if (searchValue !== '') setWarningSearch(false)
        searchRequestDebounced(e)
      }}
      status={warningSearch}
      style={{ width: '938px', margin: '0 auto', marginTop: '20px' }}
      value={searchValue}
      onSearch={() => {
        if (searchValue === '') setWarningSearch('warning')
        searchRequest(searchValue)
        clearSearch()
      }}
    />
  ) : null
}
