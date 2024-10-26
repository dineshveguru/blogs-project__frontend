function Card(props) {
  const title = props.title;
  const intro = props.intro;
  // const date = props.date;
  return (
    <div>
      <h1 className="blog__heading">{title}</h1>
      <p className="blog__intro">{intro}</p>
      {/* <p className="blog__created_date">{date}</p> */}
    </div>
  );
}

export default Card;
