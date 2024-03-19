export default function Meals({ onAdding, meals }) {

  return (
    <div>
      <ol id="meals">
        {meals.map((meal) => {
          return (
            <li className="meal-item" key={meal.id}>
              <article>
                <img src={`../backend/public/${meal.image}`} />
                <h3>{meal.name}</h3>
                <div className="meal-item-actions">
                  <div className="meal-item-price">${meal.price}</div>
                </div>
                <p className="meal-item-description">{meal.description}</p>
                <div className="meal-item-actions">
                  <button
                    onClick={() => onAdding(meal.name, meal.price)}
                    className="button"
                  >
                    Add to Cart
                  </button>
                </div>
              </article>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
