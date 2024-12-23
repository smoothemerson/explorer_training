import { Container } from "./styles";

import tomate from '../../assets/tomate.png'
import imagePlaceholder from '../../assets/image-not-found-icon.svg';

export function Ingredients({ ingredient }) {

  function fetchImageIngredient(name) {
    const ingredient = name.toLowerCase().trim();
    return ingredient === 'tomate' ? tomate : imagePlaceholder;
  }

  const ingredientImage = fetchImageIngredient(ingredient);

  return (
    <Container>
      <div className="ingredients">
        <div>
          <p>{ingredient}</p>
        </div>
      </div>
    </Container>
  );
}
