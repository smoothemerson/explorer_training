import { Container } from "./styles";
import { FiPlus, FiX } from "react-icons/fi";

export function IngredientsTag({ isNew, value, onClick, ...rest }) {
  const ingredients = [
    "Aguardente", "Alface", "Ameixa", "Amêndoas", "Aniz", "Aspargo", "Batata", 
    "Bacon", "Café", "Camarão", "Canela", "Cebola", "Claras", "Coca-Cola", 
    "Damasco", "Farinha", "Filé", "Limão", "Maçã", "Manjericão", "Maracujá", 
    "Massa", "Morango", "Negroni", "Pão Naan", "Pão", "Pepino", "Pêssego", 
    "Pesto", "Presunto", "Queijo", "Rabanete", "Rucula", "Sorvete", "Tomate", 
    "Whiskey"
  ];

  return (
    <Container $isNew={isNew}>
      <input 
        type="text"
        value={value}
        readOnly={!isNew}
        {...rest}
        list="ingredientName"
      />
      <datalist id="ingredientName">
        {ingredients.map((ingredient, index) => (
          <option key={index} value={ingredient} />
        ))}
      </datalist>
      <button
        type="button"
        onClick={onClick}
        className={isNew ? "button-add" : "button-delete"}
      >
        {isNew ? <FiPlus /> : <FiX />}
      </button>
    </Container>
  );
}
