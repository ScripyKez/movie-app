import React from 'react'
import './Header'
import { Menu } from 'antd'
import AppSearch from '../AppSearch'

export default function Header({ changeList, searchRequest, currentList }) {
  const items = [
    {
      label: 'Top trending',
      key: 'trending',
      style: {
        marginLeft: 'auto',
      },
    },
    {
      label: 'Top Rated',
      key: 'rated',
    },
    {
      label: 'Search',
      key: 'search',
    },
    {
      label: 'Your rates',
      key: 'userRates',
      style: {
        marginRight: 'auto',
      },
    },
  ]

  return (
    <header className="header" style={{ display: 'flex', flexWrap: 'wrap' }}>
      <Menu
        mode="horizontal"
        items={items}
        style={{ display: 'flex', width: '100%' }}
        defaultSelectedKeys={['trending']}
        selectable={true}
        onSelect={({ key }) => {
          changeList(key)
        }}
      />
      <AppSearch currentList={currentList} searchRequest={searchRequest} />
    </header>
  )
}
