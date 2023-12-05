const HeaderWithRulers = ({ className, heading }) => {
  return (
    <div
      className={`with-rulers text-center font-condensed text-7xl uppercase ${className}`}
    >
      {heading}
    </div>
  )
}

export default HeaderWithRulers
