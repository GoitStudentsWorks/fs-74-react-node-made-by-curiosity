import { CategoriesList, CardLink } from './BodyPartsList.styled';

export const BodyPartsList = () => {
  const bodyParts = [];
  console.log(bodyParts);

  return (
    <CategoriesList>
      {bodyParts?.map(card => (
        <CardLink key={card._id}>
          <li>{card.name}</li>
        </CardLink>
      ))}
    </CategoriesList>
  );
};
