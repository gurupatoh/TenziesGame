
function Die(props) {
  const styles={
    backgroundColor:props.isHeld?"#59E391":"white",
    
  }
  let dots = [];
  for (let i = 0; i < props.value; i++) {
    dots.push(<span className="dot"></span>);
  }
  return (
    <div 
    className="die-face"
     style={styles} 
    onClick={props.holdDie}
     >
        {dots}
    </div>
  )
}
export default Die
