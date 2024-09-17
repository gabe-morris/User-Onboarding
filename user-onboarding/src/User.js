import React from 'react'

function User({ details}) {
if (!details) {
return <h3>fetching users...</h3>

}
return (
<div className = 'user-container'>
    <h2>{details.username}</h2>
    <p>Email: {details.email}</p>
</div>
)
}

export default User