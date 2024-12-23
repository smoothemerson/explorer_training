import { Container } from './styles';
import { Tag } from '../Tag';

export function Tags({ data, ...rest }) {
  return (
    <Container {...rest}>
      {data && (
        <main>
          {data.map(tag => (
            <Tag key={tag.id} title={tag.name} />
          ))}
        </main>
      )}
    </Container>
  );
}
