import React from 'react'
import { Rings } from 'react-loader-spinner';

export default function Loader() {
  return (
    <Rings
            height="80"
            width="80"
            color="#4d61a9"
            radius="6"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="rings-loading"
          />
  )
}
