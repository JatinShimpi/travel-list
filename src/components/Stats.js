export default function Stats({ Items }) {
  if (!Items.length)
    return (
      <p className="stats">
        <em>start adding items to your packing list🚀</em>
      </p>
    );

  const numItems = Items.length;
  const numberPacked = Items.filter((item) => item.packed).length;
  const percent = Math.round((numberPacked / numItems) * 100);
  return (
    <footer className="stats">
      <em>
        {percent === 100
          ? "you got everything! ready to go ->"
          : `💼 you have ${numItems} items on your list, and you already packed ${numberPacked} (${percent}%)`}
      </em>
    </footer>
  );
}
