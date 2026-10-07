const COLORS = ['#f2994a', '#eb5757', '#6fcf97', '#2d9cdb', '#9b51e0', '#56ccf2']

function getColor(title) {
  const sum = [...title].reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return COLORS[sum % COLORS.length]
}

function Avatar({ title }) {
  const letter = title.replace('+', '').charAt(0).toUpperCase()

  return (
    <div className="avatar" style={{ backgroundColor: getColor(title) }}>
      {letter}
    </div>
  )
}

export default Avatar
