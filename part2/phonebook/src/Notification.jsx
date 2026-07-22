const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  const style = {
    color: type === 'error' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: '20px',
    border: `2px solid ${type === 'error' ? 'red' : 'green'}`,
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification