import React from 'react'

import { Pagination } from 'antd'

export default function AppPagination({ currentList, handleChangePage }) {
  return (
    <>
      {currentList !== 'userRates' ? (
        <Pagination
          style={{ margin: '30px', position: 'relative', left: '33%' }}
          total={200}
          showSizeChanger={false}
          defaultCurrent={1}
          pageSize={20}
          onChange={handleChangePage}
        />
      ) : null}
    </>
  )
}
