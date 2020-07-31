import React, { useState, useEffect  } from 'react';

const MyBook =(props) => {
  useEffect(() => {
    Promise.all([
      fetch('https://iroblog/jsonapi/paragraph/zigzag?fields[paragraph--zigzag]=field_description,field_book&include=field_book&fields[file--file]=uri&sort=created', {'method': 'GET'})
    ])
      .then (values => Promise.all(values.map(value => value.json())))
      .then(data => {
        console.log(data)
      })
  }, [])

  return (
    <div></div>
  )
}

export default MyBook;
