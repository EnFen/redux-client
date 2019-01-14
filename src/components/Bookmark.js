import React from 'react'

export default function Bookmark(props) {
    const { _id, title, url, remove } = props
    return (
        <div>
            {title} (<a href={url}>Visit</a>)
          <button onClick={() => remove(_id)}>Delete</button>
        </div>
    )
}
