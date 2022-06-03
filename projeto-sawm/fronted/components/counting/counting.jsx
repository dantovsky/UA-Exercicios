import React from 'react'

const Counting = ({numEvents, queryApplyed}) => (
    <p className="mb-2">
        <span className="label font-medium result-count" hidden={numEvents === 0}>
            Showing {numEvents} results for "{queryApplyed}"
        </span>
    </p>

)

export default Counting